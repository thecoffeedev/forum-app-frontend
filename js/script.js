let url = "https://forum-app-backend-api.herokuapp.com";

let login = () => {
  document.getElementById('lg-btn').disabled = true;
  let mail = document.getElementById("email").value;
  let pwd = document.getElementById("password").value;
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      'Authorization': sessionStorage.urlWebToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      password: pwd
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      let item = document.getElementById('alert-msg');
      item.hidden = false;
      item.className = ""
      item.classList.add('alert')
      if(res.message == "user logged in successfully"){
        item.classList.add('alert-success')
        item.innerHTML = res.message;
        sessionStorage.setItem("urlWebToken", res.token);
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }else if(res.message == "incorrect password" || "user is not activated. check your mail for more information"){
        item.classList.add('alert-warning')
        item.innerHTML = res.message;
      }else{
        item.classList.add('alert-danger')
        item.innerHTML = res.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


let register = () => {
  document.getElementById('sb').disabled = true;
  let firstName = document.getElementById('fname').value;
  let lastName = document.getElementById('lname').value;
  let mail = document.getElementById('email').value;
  let pswd = document.getElementById('password').value;
  fetch(`${url}/register-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fname: firstName,
      lname: lastName,
      email: mail,
      password: pswd
    })
  }).then((res) => res.json())
  .then((res) => {
    let item = document.getElementById('alert-msg');
      item.hidden = false;
      item.className = ""
      item.classList.add('alert')
      if(res.message == "activation link sent to mail"){
        item.classList.add('alert-success')
        item.innerHTML = res.message;
      }else if(res.message == "user already exists, please login"){
        item.classList.add('alert-warning')
        item.innerHTML = res.message;
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
  })
}

let passwordReset = () => {
  let mail = document.getElementById('email').value;
  let timeleft = 10;
  document.getElementById('button').disabled = true;
  let downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      document.getElementById('button').disabled = false;
      document.getElementById("countdown").innerHTML = '';
      clearInterval(downloadTimer);
    }else{
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
  fetch(`${url}/forgot-password`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: mail
    })
  }).then((res) => res.json())
  .then((res) => {
    let item = document.getElementById('alert-msg');
      item.hidden = false;
      item.className = ""
      item.classList.add('alert')
      if(res.message == "Password reset link sent to email"){
        item.classList.add('alert-success')
        item.innerHTML = res.message;
      }else if(res.message == "user is not registered"){
        item.classList.add('alert-warning')
        item.innerHTML = res.message;
      }
  }).catch((err) => {
    console.log(err)
  })
}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
      queryEnd   = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}

let checkHash = () => {
  let img = 'https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1';
  if(!parseURLParams(document.location.href)){
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover'
    return;
  }
  let {id, rps} = parseURLParams(document.location.href);
  fetch(`${url}/verify-random-string`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: id[0],
      verificationString: rps[0]
    })
  }).then((res) => res.json())
  .then((res) => {
    if(res.message == "verification string valid"){
      document.getElementById('main-cont').hidden = false;
    }else{
      document.body.style.backgroundImage = `url('${img}')`;
      document.body.style.backgroundSize = 'cover'
    }
  }).catch((err) => {
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover'
    console.log(err)
  })
}

let activeCheckHash = () => {
  let img = 'https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1';
  if(!parseURLParams(document.location.href)){
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover'
    return;
  }
  let {id, usa} = parseURLParams(document.location.href);
  fetch(`${url}/activate-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: id[0],
      activationString: usa[0]
    })
  }).then((res) => res.json())
  .then((res) => {
    if(res.message == "activation successfull"){
      document.getElementById('main-cont').hidden = false;
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }else{
      document.body.style.backgroundImage = `url('${img}')`;
      document.body.style.backgroundSize = 'cover'
    }
  }).catch((err) => {
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover'
    console.log(err)
  })
}

let setPassword = () => {
  let p1 = document.getElementById('password1').value;
  let p2 = document.getElementById('password2').value;
  let {id, rps} = parseURLParams(document.location.href);
  if (p1 != p2) {
    let item = document.getElementById('alert-msg');
    item.hidden = false;
    item.className = ""
    item.classList.add('alert')
    item.classList.add('alert-warning')
    item.innerHTML = 'Password does not match. Please type same password';
  }else{
    fetch(`${url}/assign-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id[0],
        verificationString: rps[0],
        password: p1
      })
    }).then((res) => res.json())
    .then((res) => {
      let item = document.getElementById('alert-msg');
      item.hidden = false;
      item.className = ""
      item.classList.add('alert')
      item.classList.add('alert-success')
      item.innerHTML = 'Password reset successful';
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }).catch((err) => {
      console.log(err);
    })
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = '/';
}

const commentSection = (data) => {
  let comments = data.comments;
  let commentSec = document.getElementById('cs')
  commentSec.innerHTML = "";
  comments.forEach(element => {
    let cont_ = document.createElement('div');
    cont_.classList.add("mt-3", "border", "rounded", "bg-light", "p-3")
    let tile_ = document.createElement('div')
    tile_.classList.add("col", "disabled", "d-inline-block")
    fetch(`${url}/user-details/${element.commented_by}`)
    .then(res => res.json())
    .then((res) => {
      tile_.innerHTML = `<strong>commentor &nbsp;:</strong> &nbsp;&nbsp;${res.data.fname} ${res.data.lname}&nbsp;&nbsp; |&nbsp;&nbsp; <strong>email</strong>&nbsp; : &nbsp; ${res.data.email}`
      tile_.innerHTML += `<strong><br>commented on &nbsp;:</strong> &nbsp;&nbsp;${element.commented_on.substring(0, 10)}&nbsp;&nbsp; | &nbsp;&nbsp;<strong>role</strong> &nbsp;: &nbsp;${res.data.role}`
      tile_.innerHTML += `<br><hr><h3 style="display: inline-block">${element.comment}</h3>`
    })
    cont_.append(tile_);
    commentSec.append(cont_)
  });
}

const topicPage = (element) => {
  let tile = document.getElementById('topic-tile')
  fetch(`${url}/user-details/${element.created_by}`)
  .then(res => res.json())
  .then((res) => {
    tile.innerHTML = `<strong>creator &nbsp;:</strong> &nbsp;&nbsp;${res.data.fname} ${res.data.lname}&nbsp;&nbsp; |&nbsp;&nbsp; <strong>email</strong>&nbsp; : &nbsp; ${res.data.email}`
    tile.innerHTML += `<strong><br>created on &nbsp;:</strong> &nbsp;&nbsp;${element.created_on.substring(0, 10)}&nbsp;&nbsp; | &nbsp;&nbsp;<strong>role</strong> &nbsp;: &nbsp;${res.data.role}`
    tile.innerHTML += `<br><hr><h2 class="display-4">${element.topic_title}</h2>`
    tile.innerHTML += `<p class="mt-5">&nbsp;&nbsp;&nbsp;&nbsp; ${element.content}</p>`
  })

  let btn = document.getElementById('submit-btn')
  btn.addEventListener("click", function(){
    fetch(`${url}/add-comment`, {
      method:  "POST",
      headers: {
        'Authorization': sessionStorage.getItem('urlWebToken'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic_id: element._id,
        comment: document.getElementById('adc').value
      })
    }).then((res) => res.json())
    .then((res) => {
      console.log("success");
      fetch(`${url}/comments/${element._id}`)
      .then((res) => res.json())
      .then((res) => {
        commentSection(res);
      })
    })
  })

  fetch(`${url}/comments/${element._id}`)
  .then(res => res.json())
  .then((res) => {
  commentSection(res);
  })

}

const postData = () => {
  if (!sessionStorage.getItem('urlWebToken')){
    document.getElementById('frm').classList.toggle('hidden');
    document.getElementById('libtn').style.visibility = "visible";
    document.getElementById('subtn').style.visibility = "visible";
    document.getElementById('lobtn').style.visibility = "hidden";
    document.getElementById('lobtn').classList.toggle("hidden");
  }else{
    document.getElementById('libtn').style.visibility = "hidden";
    document.getElementById('subtn').style.visibility = "hidden";
    document.getElementById('lobtn').style.visibility = "visible";
  }
  let element = sessionStorage.getItem('element-post');
  topicPage(JSON.parse(element));
}

const signup = () => {
  if (!sessionStorage.getItem('urlWebToken')){
    document.getElementById('frm').classList.toggle('hidden');
    document.getElementById('libtn').style.visibility = "visible";
    document.getElementById('subtn').style.visibility = "visible";
    document.getElementById('lobtn').style.visibility = "hidden";
    document.getElementById('lobtn').classList.toggle("hidden");
  }else{
    document.getElementById('libtn').style.visibility = "hidden";
    document.getElementById('subtn').style.visibility = "hidden";
    document.getElementById('lobtn').style.visibility = "visible";
  } 
}

const topicTiles = (data) => {
  let bodyCont = document.getElementById('body-cont');
  bodyCont.innerHTML = "<h2 style='display: inline-block'>Topics</h2>"
  if(sessionStorage.getItem('urlWebToken')){
    let addTopicBtn = document.createElement('button')
    addTopicBtn.classList.add("btn", "btn-outline-info", "float-right")
    addTopicBtn.innerHTML = "Add Topic"
    addTopicBtn.addEventListener("click", () => {
      window.location.href = '/addTopic.html';
    })
    bodyCont.append(addTopicBtn)
  }
  data.forEach(element => {
    let cont = document.createElement('div');
    cont.classList.add("mt-3", "border", "rounded", "bg-light", "p-3")
    let tile = document.createElement('div')
    tile.classList.add("col", "disabled", "d-inline-block")
    fetch(`${url}/user-details/${element.created_by}`)
    .then(res => res.json())
    .then((res) => {
      tile.innerHTML = `<strong>creator &nbsp;:</strong> &nbsp;&nbsp;${res.data.fname} ${res.data.lname}&nbsp;&nbsp; |&nbsp;&nbsp; <strong>email</strong>&nbsp; : &nbsp; ${res.data.email}`
      tile.innerHTML += `<strong><br>created on &nbsp;:</strong> &nbsp;&nbsp;${element.created_on.substring(0, 10)}&nbsp;&nbsp; | &nbsp;&nbsp;<strong>role</strong> &nbsp;: &nbsp;${res.data.role}`
      tile.innerHTML += `<br><hr><h3 style="display: inline-block">${element.topic_title}</h3>`
      let btn = document.createElement("button")
      btn.innerHTML = "Go to Topic"
      btn.classList.add("btn", "btn-primary", "float-right", "mt-1")
      btn.addEventListener("click", function() {
        window.location.href = '/post.html'
        sessionStorage.setItem('element-post', JSON.stringify(element));
        // topicPage(element)
      })
      tile.append(btn)
    })
    cont.append(tile)
    bodyCont.append(cont);
  });
}

let isTokenValid = () => {
  if(sessionStorage.getItem('urlWebToken')){
    fetch(`${url}/tokenValid`, {
      method: "POST",
      headers: {
        'Authorization': sessionStorage.getItem('urlWebToken'),
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if (res){
        console.log('success');
      }
    })
    .catch((err) => {
      console.log(err);
      sessionStorage.clear()
    })
  }
}

let loadTopics = () => {
  isTokenValid();
  if(!sessionStorage.getItem('urlWebToken')){
    fetch(`${url}/topics`)
    .then((res) => res.json())
    .then((res) => {
      topicTiles(res.topics)
      document.getElementById('libtn').style.visibility = "visible";
      document.getElementById('subtn').style.visibility = "visible";
      document.getElementById('lobtn').style.visibility = "hidden";
      document.getElementById('lobtn').classList.toggle("hidden");
    })
    .catch((err) => {
      console.log(err);
      window.location.href = '/';
    });
  }
  if(sessionStorage.getItem('urlWebToken')){
    fetch(`${url}/user-topics`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('urlWebToken'),
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then((res) => {
      topicTiles(res.data.topics)
      document.getElementById('libtn').style.visibility = "hidden";
      document.getElementById('subtn').style.visibility = "hidden";
      document.getElementById('lobtn').style.visibility = "visible";
    })
    .catch((err) => {
      console.log(err);
      window.location.href = '/';
    })
  }
}

const gotoLogin = () => {
  window.location.href = '/login.html'
}

const gotoRegister = () => {
  window.location.href = '/register.html'
}

const search = () => {
  let text = document.getElementById('search-text').value;
  let from_date = document.getElementById('frmdt').value;
  let to_date = document.getElementById('todt').value;
  let limit = parseInt(document.getElementById('limit').value);

  let data = {
    text: text,
    from_date: from_date,
    to_date: to_date,
    limit: limit
  }
  // console.log(data)
  fetch(`${url}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
    topicTiles(res.result)
  })
}

const addaTopic = () => {
  let title = document.getElementById('topic').value;
  let content = document.getElementById('content').value;
  let data = {
    topic_title : title,
    content: content
  }
  fetch(`${url}/add-topic`, {
    method: 'POST',
    headers: {
      'Authorization' : sessionStorage.getItem('urlWebToken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((res) => {
    window.location.href = '/'
  })
}