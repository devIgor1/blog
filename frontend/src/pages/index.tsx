import Header from "@/components/Header/page"
import { GetServerSideProps } from "next"

export default function Home() {
  return (
    <main className="min-h-screen min-w-full bg-lightM dark:bg-darkM dark:text-lightM">
      <Header />
      <div className="w- mt-5 flex justify-center font-rem">
        <ol type="1">
          <li className="flex flex-col">
            <a href="#">Primeiro artigo</a>
          </li>
        </ol>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("TESTING")

  return {
    props: {},
  }
}
