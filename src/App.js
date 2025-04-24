import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [animals, setAnimals] = useState([]);
  const [showVideo, setShowVideo] = useState(false); // ✅ 유튜브 토글 상태 추가
  
  async function fetchByType(type) {
    const { data, error } = await supabase
      .from('test_animal')
      .select('*')
      .eq('type', type);

    if (error) {
      console.error('에러 발생:', error);
    } else {
      setAnimals(data);
    }
  }

  return (
    <div>
      <h1>Hello, World!!</h1>
      <img
        src="https://res.cloudinary.com/dgg7bpdyr/image/upload/v1745255072/cat-5628953_1920_nqcuib.jpg"
        alt="dgg7bpdyr"
        style={{ maxWidth: '300px', marginTop: '20px' }}
      />
      <h3>종 선택</h3>
      <button onClick={() => fetchByType('mammalia')}>포유류</button>
      <button onClick={() => fetchByType('reptiles')}>파충류</button>
      <button onClick={() => fetchByType('bird')}>조류</button>
      <h2>동물 리스트</h2>
      {animals.length > 0 ? (
        <ul>
          {animals.map((animal) => (
            <li key={animal.id}>
              이름: {animal.name}, 분류: {animal.type}, 색상: {animal.color}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 선택된 종이 없습니다.</p>
      )}

      <hr style={{ margin: '30px 0' }} />

      {/* ✅ 유튜브 버튼 추가 */}
      <button onClick={() => setShowVideo(true)}>유튜브 보기</button>

      {/* ✅ 유튜브 영상 표시 조건 */}
      {showVideo && (
        <div style={{ marginTop: '20px' }}>
          <h3>유튜브 영상</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/pDpKEKNwz2Y?si=byLj5EwJ2PQCLyZP"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;

