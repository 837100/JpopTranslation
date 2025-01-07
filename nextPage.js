
         // 사이드바 토글 함수
         function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }
      
      
      // URL에서 선택된 주제(숫자) 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const selectedThemes = urlParams.get('song'); // 예: "1,2,3"



        // 선택된 키값으로 노래 데이터 가져오기
        const matchedSong = songs[selectedThemes];
        if (matchedSong) {
            document.getElementById('song-title').textContent = matchedSong.title;

            titleNavigater();
            fetch(matchedSong.lyricsFile)
                .then(response => response.text())  // 텍스트 파일 읽어오기
                .then(data => {
                    // 가사 데이터 삽입
                    document.getElementById('song-lyrics').textContent = data;
                })
                .catch(error => console.error('Error loading lyrics:', error));

            // YouTube 플레이어 API 스크립트 로드
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // YouTube 플레이어를 생성할 변수
            let player;

            // YouTube API가 로드되었을 때 실행되는 함수
            function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: matchedSong.videoId, // 비디오 ID
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }

            // 플레이어가 준비되었을 때 실행되는 함수
            function onPlayerReady(event) {
                event.target.playVideo(); // 자동으로 비디오 재생
            }
        } else {
            document.getElementById('song-title').textContent = "선택된 노래를 찾을 수 없습니다. 관리자에게 문의해주세요.";
        }
        // 화면 크기 변화에 따라 플레이어 크기와 main의 margin-top을 업데이트
        function adjustMainMargin() {
            const player = document.getElementById('player');
            const main = document.getElementById('main');

            // 플레이어의 높이를 가져와서 margin-top을 조정
            const playerHeight = player.offsetHeight;

            // main의 margin-top을 플레이어의 높이에 맞게 설정
            main.style.marginTop = (playerHeight + 5) + 'px';
        }

        // 페이지 로드 시와 화면 크기 변경 시 실행
        window.addEventListener('resize', adjustMainMargin); // 화면 크기 조정 시 호출
        window.addEventListener('load', adjustMainMargin); // 페이지 로드 시 호출
