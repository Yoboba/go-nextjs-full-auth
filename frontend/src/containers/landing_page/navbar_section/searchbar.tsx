"use client";
import { Input } from "@/components/ui/input";
import url from "@/constants/url";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([
    {
      id: "",
      username: "",
    },
  ]);
  const [users, setUsers] = useState([
    {
      id: "",
      username: "",
    },
  ]);

  async function getUsers() {
    const response = await fetch(url.client.GetUsers, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error Fetching Users : ", err);
      });
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(search),
      );
      setFilteredUsers(filtered);
    }
  }, [search]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value.toLowerCase());
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex items-center w-96 max-w-sm rounded-full border border-g2/50 bg-white dark:bg-gray-900 ">
      <IconSearch size={20} className=" text-g2  ml-3 mr-0" />
      <form onSubmit={handleSubmit} className=" w-full">
        <Input
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className="w-full border-0 h-8 focus:border-white shadow-none focus-visible:ring-0"
          placeholder="Author's name"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </form>
      {isOpen && (
        <div className="w-96 top-16 -ml-1 absolute h-fit bg-white drop-shadow-xl rounded-md p-4">
          <h2 className=" text-gray-400 font-normal">PEOPLE</h2>
          {filteredUsers.map((user) => (
            <p
              className="pt-2 font-semibold cursor-pointer hover:underline"
              key={user.id}
            >
              {user.username}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
