const findUserBtn = document.querySelector('#findUserForm');
const createUserBtn = document.querySelector('#createUserBtn');
const allUsersBtn = document.querySelector('#allUsersBtn');
const updateUserBtn = document.querySelector('#updateUserBtn');
const cancelUpdate = document.querySelector('#cancelUpdate');
const display = document.querySelector('.content');
const emptyDatabse = document.querySelector('#emptyDB');

//====================
// Private Methods
//====================
const buildDisplay = (id, name, age) => {
  console.log({id})
  display.innerHTML += `
                  <div class="userDisplay">
                      <p>Name: ${name}</p>
                      <p>Age: ${age}</p>
                      <button class="deleteBtn" type="button">
                        Delete User
                      </button>
                      <button class="updateBtn" type="button" data-id=${id}>
                        Update User
                      </button>
                  </div>`;
};

const usersDisplay = users => {
  display.innerHTML = '';

  if (users.length === 0 || users === undefined || !users) {
    return display.innerHTML = '<h2>No user data</h2>';
  } else if (!Array.isArray(users)) {
    const { _id, name, age } = users;
    return buildDisplay(_id, name, age)
  }

  return users.map(user => {
    const { _id, name, age } = user;
    buildDisplay(_id, name, age);
  });
};

const updateUser = id => {
  axios.put(`/api/update-user/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

const deleteUser = id => {
  axios.delete(`/api/user/${id}`)
    .then(res => {
      fetchAllUsers();
    })
    .catch(err => console.log(err));
};

const fetchAllUsers = () => {
  axios.get('/api/users')
    .then(users => {
      console.log({users});
      return usersDisplay(users.data)
    })
    .catch(err => console.log(err.response));
}

//====================
// Event Listeners
//====================
findUserBtn.addEventListener('submit', e => {
  // Prevent the window from refreshing
  e.preventDefault();
  // Grab the value from userName input element
  const name = document.getElementById('userName').value.trim();
  if (!name || name === '') return alert('Please enter a name!');

  axios.get(`/api/user/${name}`)
    .then(res => {
      console.log(res);
      return usersDisplay(res.data)
    })
    .catch(err => console.log(err));
});

// Create user using data from input fields
createUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
  };
  const { name, age } = data;

  axios.post('/api/post-user', {
    name,
    age
  })
    .then(user => {
      document.querySelector('#name').value = '';
      document.querySelector('#age').value = '';
      usersDisplay(user.data);
    })
    .catch(err => console.log(err));
});

// On click, send a request to backend routes to retrieve
// all User model items, then pass through to callback
allUsersBtn.addEventListener('click', e => {
  e.preventDefault();
  fetchAllUsers();
});

updateUserBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log({e})
  const data = {
    _id: document.querySelector('#userId').value,
    name: document.querySelector('#name').value,
    age: document.querySelector('#age').value
  };
  const { _id, name, age } = data;

  axios.put('/api/user', {
    _id,
    name,
    age,
  })
    .then(res => {

      cancelUpdate.style.display = 'none';
      updateUserBtn.style.display = 'none';
      createUserBtn.style.display = 'block';

      document.querySelector('#name').value = '';
      document.querySelector('#age').value = '';
      fetchAllUsers();
    })
    .catch(err => console.log(err));
});

emptyDatabse.addEventListener('click', e => {
  e.preventDefault();
  axios.delete('/api/empty-database')
    .then(res => fetchAllUsers())
    .catch(err => console.log(err));
});

cancelUpdate.addEventListener('click', e => {
  e.preventDefault();

  e.target.style.display = 'none';
  updateUserBtn.style.display = 'none';
  createUserBtn.style.display = 'block';

  document.querySelector('#name').value = '';
  document.querySelector('#age').value = '';
});

// Add an event listener to the document to allow
// event listener functionality for dynamically created elements
document.addEventListener('click', e => {
  console.log(e);
  if (e.target && e.target.className === 'deleteBtn') {
    const id = e.target.dataset.id;
    deleteUser(id);
  }

  if (e.target && e.target.className === 'updateBtn') {
    console.log('hit')
    const id = e.target.dataset.id;

    cancelUpdate.style.display = 'block';
    updateUserBtn.style.display = 'block';
    createUserBtn.style.display = 'none';

    axios.get(`/api/user/${id}`)
      .then(res => {
      console.log("TCL: res", res)
        const { _id, name, age } = res.data[0];
        document.querySelector('#name').value = name;
        document.querySelector('#age').value = age;
        document.querySelector('#userId').value = _id;
      })
      .catch(err => console.log(err));
  }
});