import React from "react";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// dotenv.config({
//   path: path.resolve(__dirname, ""),
// });

async function getData() {
  const res = await fetch(`${process.env.NEXT_HOST_URL}`, {
    method: "GET",
  });

  const data = await res.json();

  if (data) {
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const res = await getData();

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Arnab Here from the Dummy NextApp.js and The App is Updated.
        <p>Data from API: {res.message}</p>
      </main>
    </div>
  );
}
