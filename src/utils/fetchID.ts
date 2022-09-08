import { encryptor } from './Encrypt';
import fetchFormat from './fetchFormat';

const fetchID = async () => {

  const result = await fetchFormat("http://localhost:4000/check", "GET", '')
  const json = await result.json();
  return encryptor.decrypt(json.id);

};

export default fetchID;
