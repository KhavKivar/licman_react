

import styled from 'styled-components';

const Button = styled.button`
    background-color: var(--black);
    border: medium none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0.5rem 0 0 0.5rem;
    cursor: pointer;

    &::before,&::after{
        content: "";
        background-color: var(--white);
        height: 2.5px;
        width: 1rem;
        position:absolute;
        transition: all 0.3s ease;
    }
    &::before{
        top: ${(props) => props.clicked ? "" : "1.4rem"};
        transform: ${(props) => props.clicked ? "rotate(135deg)" : "rotate(0)"};
    }

    &::after{
        top: ${(props) => props.clicked ? "" : "1.9rem"};
        transform: ${(props) => props.clicked ? "rotate(-135deg)" : "rotate(0)"};

    }
`;
export default function SideBarTop(props) {
    

   return <Button clicked={props.click} onClick = {props.onclick} ></Button>;

}

