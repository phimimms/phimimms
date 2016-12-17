import Header from './Header';
import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Link to="display" activeClassName="active">Display Page</Link>
            </div>
        );
    }
}

export default HomePage;
