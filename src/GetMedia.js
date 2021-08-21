import React, { Component, useEffect, useState } from "react";
const ipfsClient = require("ipfs-http-client");
const Buffer = require("buffer").Buffer;

const GetMedia = async (props) => {
  //const dispatch = useDispatch();
  const [path, setPath] = useState(props.path);
  const ipfs = ipfsClient("http://localhost:5002"); // (the default in Node.js)
  const [data, setData] = useState("");

  const stream = ipfs.cat("https://ipfs.io/{path}");
  //let data = ''

  useEffect(async () => {
    try {
      const data1 = "";
      for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data1 += chunk.toString();
      }
      console.log(data1);
      setData(data1);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <a href={"https://ipfs.io/ipfs/" + { data }}></a>;
};

export default GetMedia;
