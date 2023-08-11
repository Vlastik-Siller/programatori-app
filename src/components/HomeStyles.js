import styled from 'styled-components';

export const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background-color: transparent;
`; 

export const EmployeeList = styled.div`      //zakladni styl
    display: flex;
    flex-direction: column;
    width: 500px;
    background: transparent;
`;

export const EmployeeItem = styled.div`      //styl vypisu zamestnancu
    display: flex;
    height: 45px;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-top: 4px;
    border: 1px solid black;
    background-color: #e6e6e6;
    &:nth-child(even) {
        background-color: #3399ff50;
    }
`;

export const EmployeeForm = styled(EmployeeList)`          
    flex-direction: row;
    margin: 50px 0;
    padding-top: 0;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input`
    width: 130px;
    height: 25px;
    padding-left: 10px; 
`;

export const Select = styled.input`
    width: 130px;
    height: 25px;
    padding-left: 10px; 
`;

export const Button = styled.button`
    color: white;
    cursor: pointer;
    width: 130px;
    height: 25px;
`; 

export const ButtonAdd = styled.button`
    color: black;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    background-color: ${({ disabled }) => (disabled ? 'silver' : '#ffec64')};
    border: 1px solid black;
    width: 130px;
    height: 25px;
    ${({ disabled }) => disabled && 'opacity: 0.5;'} // změny vzhledu při disabled
`;  

export const Buttons = styled(EmployeeForm)` 
    color: white;
    margin: 30px 0;
    height: 40px;
`;

export const TabButton = styled.button`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 48%;
    border: 1px solid black;
    color: black;
    font-size: 20px;
    cursor: pointer;
    background-color: ${({ name, 'data-active': activeTab }) =>
    name === activeTab ? '#e6e6e6' : 'transparent'};
`;

export const Text = styled.p`
    color: black;
    font-weight: 3rem;
`;

export const ExcavationForm = styled(EmployeeForm)`
    flex-direction: row;
`;