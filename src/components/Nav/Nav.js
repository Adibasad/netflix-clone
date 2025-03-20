import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineSearch } from "react-icons/md";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    if (id) fetchUser();

    const handleScroll = () => {
      setScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 flex items-center justify-end lg:justify-between px-6 py-4 transition-all duration-500 ${
        scroll ? "bg-black" : "bg-transparent"
      }`}
    >
      {/* Netflix Logo */}
      <Link to="/">
        <img
          className="w-20 h-8 object-contain"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="Netflix Logo"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 ml-16">
        <li>
          <Link to="/" className="text-white hover:text-red-500 transition">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/tv-shows"
            className="text-white hover:text-red-500 transition"
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="text-white hover:text-red-500 transition"
          >
            Movies
          </Link>
        </li>
      </ul>

      {/* Search Bar */}
      <form className="ml-auto hidden md:flex  rounded-full px-4 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 h-8 outline-none text-white placeholder-gray rounded-lg"
        />
        <button type="submit" className=" ml-2">
          <MdOutlineSearch className="text-3xl text-gray" />
        </button>
      </form>

      {/* User Avatar */}
      <Link to="/create" className="ml-2">
        <img
          className="w-10 rounded-lg"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User"
        />
      </Link>

      {/* Welcome Message */}
      {user && (
        <div className="text-white ml-4 hidden md:block">
          Welcome, {user.uname}!
        </div>
      )}
    </div>
  );
};

export default Nav;
