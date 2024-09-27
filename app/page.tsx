import Image from "next/image";
import styles from "./page.module.css";
import Greet from "@/components/greet";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <Link href="/auth">Login / Register</Link>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
