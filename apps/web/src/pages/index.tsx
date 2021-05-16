import Head from 'next/head';
import { FunctionComponent } from 'react';

const Home: FunctionComponent = () => {
  return (
    <div className="container">
      <Head>
        <title>Open School</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">OpenSchool Home</h1>
      </main>
    </div>
  );
};

export default Home;
