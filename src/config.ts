"use client"

import { IconType } from "react-icons/lib"
import { FaItunesNote } from "react-icons/fa6";
import { IoMdAlbums } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdArtTrack } from "react-icons/md";

export const links: [string, string][] = [
  ["Home", "/"],
  ["New releases", "/releases"],
  ["Shuffle play", "/shuffle"]
]

export const browseMusic: [IconType, string, string][] = [
  [IoHome, "Home", "/"],
  [IoMdAlbums, "Albums", "/albums"],
  [MdArtTrack, "Tracks", '/tracks'],
  [FaItunesNote, "Genres", "/genres"]
]

export const libraryLinks: [string, string][] = [
  ["/library/recent", "Recent Played"],
  ["/library/favorite", "Favorite Tracks"],
  ["/library/charts", "Charts"],
  ["/library/radio", "Radio"]
]

export const MODE: string = "production"
export const SERVER_URL = MODE === "development" ? "http://localhost:5050" : "http://147.45.160.178:5050"