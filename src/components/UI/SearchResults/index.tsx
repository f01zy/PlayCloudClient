import styles from "@/components/UI/SearchResults/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { FC } from "react"
import CardLittle from "../CardLittle";

interface ISearchResults {
  array: Array<IMusic> | null
}

const SearchResults: FC<ISearchResults> = ({ array }) => {
  return <div className={`${styles.results} ${array ? "" : styles.hidden}`}>
    {array ? array.length > 0 ? array.map(music => <CardLittle {...music} />) : <h2>Not found</h2> : ""}
  </div>
}

export default SearchResults;