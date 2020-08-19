import React from 'react';
import { Switch, Route, useHistory, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserNames } from './redux/user/user.selectors';

import './App.css';
import { addUser, removeLastUser } from './redux/user/user.actions';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';

const HelloWorld = () => {
  // const userNames = useSelector(selectUserNames);

  // const dispatch = useDispatch();

  // const dispaches = {
  //   addUser: () => dispatch(addUser({ name: 'TEST' })),
  //   removeLastUser: () => dispatch(removeLastUser()),
  // };

  const GET_USERS_AND_COUNTER = gql`
    {
      users {
        _id
        name
        email
      }
      counter @client
    }
  `;

  const INCREMENT_COUNTER = gql`
    mutation IncrementCounter {
      incrementCounter @client
    }
  `;

  const { loading, error, data } = useQuery(GET_USERS_AND_COUNTER);
  const [incrementCounter] = useMutation(INCREMENT_COUNTER);

  console.log(data);

  if (loading) return <h1>LOADING</h1>;
  return (
    <>
      <h1>Hello World</h1>
      <br></br>
      <h2>Counter</h2>
      <h2>{data.counter}</h2>
      <HelloNested />
      <ul>
        {data.users.map((user) => (
          <li>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={incrementCounter}>INCREMENT COUNTER</button>
      {/* <button onClick={dispaches.addUser}>ADD USER</button> */}
      {/* <button onClick={dispaches.removeLastUser}>REMOVE</button> */}
    </>
  );
};

const HelloNested = () => {
  // const history = useHistory();
  // const location = useLocation();
  // console.log(history);
  // console.log(location);
  return <h1>Hello Nested</h1>;
};

const TestWorld = () => <h1>Test World</h1>;

function App() {
  return (
    <div className='App'>
      <div>
        <Link to='/hello'>Hello</Link>
      </div>
      <div>
        <Link to='/test'>test</Link>
      </div>
      <Switch>
        <Route path='/hello'>
          <HelloWorld />
        </Route>
        <Route path='/test'>
          <TestWorld />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
