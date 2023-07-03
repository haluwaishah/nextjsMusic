import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchinput() {
  const [search, setSearch] = useState("");
  const router = useRouter( )
  const onSearch = (event) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(search)
    router.push('/searxh?q=${encodedSearchQuery}')
  };
  return (
    <div>
      <form className="flex justify-center w-2/3" on onSubmit={onSearch}>
      <input
        className="px-5 py-1 w-2/3 sm:px-3 flex-1 text-zinc-200 bg-zinc-800 "
        placeholder="What are you looking for?"
        value={search}
        onChange={(event) => setSearch(event.target.ariaValueMax)}
      /></form>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
