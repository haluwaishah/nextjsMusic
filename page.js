"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from "./components/Header";
import Homepage from "./screens/Homepage";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [playist, setPlaylist] = useState();
  const url =
    "https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a2cffc72aamsheffc5c7aeeaf2a3p17b5edjsn594164827765",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const play = () => {
    // console.log(data.albums[0].tracks.items[0].name)
    console.log(data);
    setPlaylist(data);
  };
  // const audioPlayer = useRef<HTMLAudioElement | null >(null)

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((resonse) => {
        console.log(resonse);
        setData(resonse);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main>
      <div className="bg-gray-500">
        <Header />
        <hr className="border-t-[01px] border-white" />
        <Homepage />
        {data &&
          data.albums.map((d) => {
            return (
              <div key={d.id}>
                <button onClick={play}>
                  <h2>{d.type}</h2>
                  {/* <h2>{d.images}</h2> */}
                  <div>
                    <div className="flex">
                      {d.images &&
                        d.images.map((i) => {
                          return (
                            <div>
                              {/* <h2>{i.url}</h2> */}
                              {/* <Image src={"i.url"} width={200} height={150} ></Image> */}
                              <img
                                src={i.url}
                                height="100"
                                width="100"
                                alt=""
                              />
                            </div>
                          );
                        })}
                    </div>
                    <h2>{d.name}</h2>
                    <h2>{d.release_date}</h2>
                    <h2>Number Of Tracks :{d.total_tracks}</h2>
                  </div>
                </button>
              </div>
            );
          })}
      </div>
      <div className="flex">
        <button className="bg-gray-400 rounded border-gray-300 position:absolute">
          {playist &&
            playist.albums.map((d) => {
              return (
                <div>
                  {d.tracks.items &&
                    d.tracks.items.map((i) => {
                      return (
                        <div className="rounded border-black border-raduis-5 gap-x-6">
                          <h2>{i.name}</h2>
                          <h2>{i.type}</h2>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </button>
        <>
          {playist &&
            playist.albums.map((d) => {
              return (
                <div>
                  {d.tracks.items &&
                    d.tracks.items.map((i) => {
                      return (
                        <div className="rounded border-black border-raduis-5 gap-x-6">
                          <h2>{i.name}</h2>
                          <div className="h-25 w-25 bg-red">
                            <AudioPlayer
                              // autoPlay= false
                              src={i.preview_url}
                              onPlay={(e) => console.log("onPlay")}
                              // other props here
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </>
      </div>
    </main>
  );
}
