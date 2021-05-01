var firebaseConfig = {
    apiKey: "AIzaSyCPiohcfxfeYf5hSRaFgcNYtaWPGys_-Ao",
    authDomain: "tinmuser.firebaseapp.com",
    databaseURL: "https://tinmuser-default-rtdb.firebaseio.com",
    projectId: "tinmuser",
    storageBucket: "tinmuser.appspot.com",
    messagingSenderId: "963218315977",
    appId: "1:963218315977:web:4e1475ccbcb065110e4b18"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database()
  var ArtistRef = database.ref("Artists/")
  var SongRef = database.ref("Songs/")
  let ArtistName = []
  let ArtistData = []
  let SongName = []
  let SongData = []
  ArtistRef.orderByChild('totalFollow').limitToLast(10).once("value", (snapshot) => {
    const data = Object.values(snapshot.val())
    for (let i = 0; i < data.length; i++) {
      console.log(data[i])
      ArtistName.push(data[i].name)
      ArtistData.push(data[i].totalFollow)
    }
    console.log(ArtistName)
    let ArtistChart = document.getElementById("topArtistChart").getContext("2d")
    const config = {
      type: 'bar',
      data: {
        labels: ArtistName,
        datasets: [{
          label: 'Total folowers',
          data: ArtistData,
                  backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
        }]
      },
    };
    let Chart1 = new Chart(ArtistChart, config)
  })


  SongRef.orderByChild('like').limitToLast(10).once("value", (snapshot) => {
    const data = Object.values(snapshot.val())
    for (let i = 0; i < data.length; i++) {
      console.log(data[i])
      SongName.push(data[i].name)
      SongData.push(data[i].like)
    }
    let SongChart = document.getElementById("topSongChart").getContext("2d")
    const config = {
      type: 'horizontalBar',
      data: {
        labels: SongName,
        datasets: [{
          label: 'Most like songs',
          data: SongData,
                  backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
        }]
      },
    //   options: {
    //     indexAxis: 'y',
    //   }
    };
    let Chart2 = new Chart(SongChart, config)
  })