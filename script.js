let moodHariIni = '';
document.getElementById('today').innerText = new Date().toLocaleDateString('id-ID');

function setMood(mood) {
  moodHariIni = mood;
  alert('Mood tersimpan: ' + mood);
}

function simpanData() {
  const data = {
    tanggal: new Date().toLocaleDateString('id-ID'),
    mood: moodHariIni,
    makanan: document.getElementById('makanan').value,
    gejala: [...document.querySelectorAll('.checkbox-group input:checked')].map(cb => cb.value),
    catatan: document.getElementById('catatan').value
  };
  let semuaData = JSON.parse(localStorage.getItem('jurnalGravesV2')) || [];
  semuaData.push(data);
  localStorage.setItem('jurnalGravesV2', JSON.stringify(semuaData));
  updateStreak();
  alert('Tersimpan! Kamu hebat hari ini ✨');
  tampilkanRiwayat();
  buatGrafik();
}

function updateStreak() {
  let streak = localStorage.getItem('streak') || 0;
  streak = parseInt(streak) + 1;
  localStorage.setItem('streak', streak);
  document.getElementById('streak').innerText = streak;
}

function buatGrafik() {
  let semuaData = JSON.parse(localStorage.getItem('jurnalGravesV2')) || [];
  let count = {};
  semuaData.forEach(d => d.gejala.forEach(g => count[g] = (count[g]||0)+1 ));

  new Chart(document.getElementById('grafik'), {
    type: 'bar',
    data: {
      labels: Object.keys(count),
      datasets: [{
        label: 'Jumlah Muncul',
        data: Object.values(count),
        backgroundColor: '#a78bfa'
      }]
    }
  });
}

// REMINDER OBAT + SUARA
function cekReminder() {
  const jam = new Date().getHours();
  const menit = new Date().getMinutes();
  if ([7, 13, 19].includes(jam) && menit === 0) {
    document.getElementById('notifSound').play();
    alert('⏰ Waktunya minum obat setelah makan yaa 💊 Kamu kuat!');
  }
}
setInterval(cekReminder, 60000);
tampilkanRiwayat(); buatGrafik(); updateStreak();
