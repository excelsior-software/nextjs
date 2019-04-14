import React, {Component} from 'react';
import Head from 'next/head';
import styled from 'styled-components'


// Load global styles
require('./styles/styles.scss');


const FirstSection = styled.div`
    height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    
`;

class Index extends Component {
    render() {
        return (
            <React.Fragment>

                <Head>
                    <title>Excelsior NEXTJS</title>

                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                        key="viewport"
                    />
                </Head>

                <style jsx global> {`
                    body {
                        margin: 0; 
                    }
                
                `} </style>


                <FirstSection>
                    <h1>🚀 Excelsior Next.JS</h1>
                    <a target="_blank" href="https://github.com/excelsior-software/nextjs">On GitHub</a>
                </FirstSection>
            </React.Fragment>
        );
    }
}



export default Index