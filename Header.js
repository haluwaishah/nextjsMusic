import BeakerIcon from "@heroicons/react/24/outline";
import Link from "next/link";
import login from "./login";
import { useState,useEffect } from "react";
// import Searchinput from "./searchinut";

export default function Header() {
    const [data,setData] =useState()
    const [search, setSearch] = useState("");

    const url =     `https://spotify23.p.rapidapi.com/search/?q=${search}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a2cffc72aamsheffc5c7aeeaf2a3p17b5edjsn594164827765',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};
const onSearch = (event) => {
    // event.preventDefault();
    const encodedSearchQuery = encodeURI(search)
    setSearch(encodedSearchQuery)
   
  };
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
  return (<>
    <div className="flex p-5 space-x-10" >
        <Link href='/'>
       
        <button className="flex  item">Home</button>
     
        </Link>
      <div className="h-5 width-10"> <form className="flex justify-center w-2/3" on onSubmit={onSearch}>
      <input
        className="px-5 py-1 w-2/3 sm:px-3 flex-1 text-zinc-200 bg-zinc-800 "
        placeholder="What are you looking for?"
        value={search}
        onChange={(event) => setSearch(event.target.ariaValueMax)}
      /></form></div>
       
   
      <button>
        <a href="/login">
        about
        </a>
        <home className="h-6 w-6" />
        
      </button>
      <button>
        <home className="h-6 w-6" />
        contact
      </button>
    </div>
    <div>
       { data && data.albums.map((d)=>{
        return(
            <div key = {d.id}>
                <h2>{d.name}</h2>
                {d.images && d.images.items.map((i)=>{
                    return(
                        <div>
                            <img  src={i.url} className="h-10 w-8"/>
                            </div>
                    )
                })}
            </div>)
        })}
        </div></>
  );
  
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
