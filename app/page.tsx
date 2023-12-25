"use client";
import React, { MouseEvent } from 'react';

const HomePage = () => {

    function handleExploreClick(event: MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="logo">PeepCoin</div>
                <div className="menu">
                    <div>Home</div>
                    <div>Service</div>
                    <div>News</div>
                    <div>Pages</div>
                    <div>Contact</div>
                    <button onClick={handleExploreClick}>Explore</button>
                </div>
            </nav>
            <header className="header">
                <div className="header-content">
                    <h1>Cryptocurrency is pseudonymous rather than anonymous</h1>
                    <button>Learn More</button>
                </div>
                <div className="header-graph">
                    [Currency Progress Graph Image]
                </div>
            </header>
            <style>{`
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                    color: white;
                    background-color: #333;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                }
                .menu div, .menu button {
                    margin-left: 20px;
                    cursor: pointer;
                }
                .menu button {
                    padding: 10px 15px;
                    background-color: yellow;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 50px;
                    background-color: black;
                    color: white;
                }
                .header-content h1 {
                    max-width: 600px;
                    margin-bottom: 20px;
                }
                .header-content button {
                    padding: 15px 30px;
                    background-color: yellow;
                    border: none;
                    border-radius: 5px;
                    font-size: 18px;
                    cursor: pointer;
                }
                .header-graph {
                    width: 400px;
                    height: 300px;
                    background-color: #444; // Placeholder for the graph image
                }
            `}</style>
        </div>
    );
};

export default HomePage;
