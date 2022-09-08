import { encryptor } from './Encrypt';

const fetchID = async () => {

  const result = await fetch("http://localhost:4000/check", {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await result.json();
  return encryptor.decrypt(json.id);

};

export default fetchID;
