import { FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

type Props = {
  onSubmit: (formData: FormData) => void;
};

export default function SearchBar({ onSubmit }: Props) {
  const handleAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const q = (formData.get("query") || "").toString().trim();

    if (!q) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(formData);
    form.reset(); 
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} onSubmit={handleAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}