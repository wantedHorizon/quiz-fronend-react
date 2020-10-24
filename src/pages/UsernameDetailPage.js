/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import quizAPi from '../api/quiz-api';

const UsernameDetailPage = (props) => {
  console.log(props);
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUserRanks = async () => {
      const user = props?.match?.params?.username;
      if (!user) {
        setError('invalid user');
      }
      const data = await quizAPi.get(`/quiz/${user}/ranks`);
      console.log(data);
      if (data.status === Number(200)) {
        setRanks(data.data);
        setLoading(false);
      } else {
        setError(data);
      }
    };
    fetchUserRanks();
  }, []);
  let display = <h1>Loading...</h1>;
  if (!loading) {
    display = ranks.map((r, i) => (
      <div key={i} className="ui card">
        <p>Name:{r.player_name}</p>
        <span>Rank:{r.rank}</span>
      </div>
    ));
  }
  return (
    <div className="UsernameDetailPage">
      <h1>usernameDetail</h1>
      {display}
    </div>
  );
};
export default UsernameDetailPage;
