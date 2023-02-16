import React, { useEffect, useState } from "react";
import './main.global.css';
import { hot } from "react-hot-loader/root"
import { Layout } from "./shared/Layout";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { TasksBlock } from "./shared/Content/TasksBlock";
import { TimerDisplay } from "./shared/Content/TimerDisplay";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore } from "redux";
import { rootReducer } from "./store/store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Statistic } from "./shared/Statistic";
import { NoMatch } from "./shared/NoMatch";
import { StartPage } from "./shared/StartPage";

const store = createStore(rootReducer, composeWithDevTools());

function AppComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <Provider store={store}>
      {mounted &&
        <Router>
          <Layout>
            <Header />
            <Switch>
              <Route exact path="/">
                <StartPage />
              </Route>

              <Route path="/timer/">
                <Content>
                  <TasksBlock setIsLoaded={setIsLoaded} isBreak={isBreak} deleteTask={deleteTask} setDeleteTask={setDeleteTask}/>
                  <TimerDisplay isLoaded={isLoaded} setIsLoaded={setIsLoaded} setIsBreak={setIsBreak} isBreak={isBreak} deleteTask={deleteTask}/>
                </Content>
              </Route>

              <Route path="/statistic/">
                <Statistic />
              </Route>

              <Route >
                <NoMatch />
              </Route>
            </Switch>
          </Layout>
        </Router>}
    </Provider>
  )
}

export const App = hot(() => <AppComponent />);
