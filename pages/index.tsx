import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from "react";
import {supabase} from "@/database/supabaseClient";

// const inter = Inter({ subsets: ['latin'] })
//{id: 10, name: 'client', description: 'thodieungs'}, {id: 11, name: 'client Plengs', description: 'sekan plengs in da haus'}
export default function Home() {
  const [list, setList] = useState([]);
  useEffect(() => {
      getItemis()
  }, [])
    const getItemis = async () => {
      try {
          const { data, error } = await supabase
              .from('itemis')
              .select('*')
          if(error) throw error;
          if(data) {
              setList(data);
          }
      } catch (error) {
          alert((error as Error).message);
      }
    }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {list.map((x) => {
          return <p key={x.id}>{x.name} AKA {x.description}</p>
        })}
      </main>
    </>
  )
}
