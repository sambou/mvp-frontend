import { PropsWithChildren } from 'react';
import classes from './styles.module.css';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import ErrorBoundary from '../ErrorBoundary';

export default function Layout(props: PropsWithChildren<{}>) {
  return (
    <ErrorBoundary>
      <div className={classes.container}>
        <AppBar className={classes.appBar} />
        <Navigation className={classes.navigation} />
        <main className={classes.main}>{props.children}</main>
        <Footer className={classes.footer} />
      </div>
    </ErrorBoundary>
  );
}
