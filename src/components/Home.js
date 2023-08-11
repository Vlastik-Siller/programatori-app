import React, { useState, useEffect, useRef } from "react";
import {
  PageContainer,
  EmployeeList,
  EmployeeItem,
  EmployeeForm,
  Input,
  Button,
  Buttons,
  TabButton,
  ExcavationForm,
  Text,
  ButtonAdd,
} from "./HomeStyles";
import employees from "../employeesData";

export default function Home() {
  const skills = ["senior", "junior"];
   
    const employeesCount = useRef(employees.length);
    const [listOfEmployees, setListOfEmployees] = useState(employees);
    const [newEmployee, setNewEmployee] = useState({
    id: employeesCount.current + 1,
    firstName: "",
    lastName: "",
    skill: "",
    });    
    
  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState("list-of-employees");
  const [planedMeters, setPlanedMeters] = useState("");
  const [planedHours, setPlanedHours] = useState("");
  const seniorCount = listOfEmployees.filter((employee) => employee.skill === "senior").length;
  const juniorCount = listOfEmployees.filter((employee) => employee.skill === "junior").length;
  const totalPerformance = seniorCount * 200 + juniorCount * 100;
  const hourlyDemand = planedMeters / planedHours;
  const [isButtonEnabled, setButtonEnabled] = useState(hourlyDemand <= totalPerformance);

  useEffect(() => {
    if (hourlyDemand <= totalPerformance) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [hourlyDemand, totalPerformance]);

  const handleScheduleWork = () => {
    setPlanedHours("");
    setPlanedMeters("");
  };

        const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedEmployee = { ...newEmployee, [name]: value };
        setNewEmployee(updatedEmployee);
        if (name === "firstName" || name === "lastName") {
          validateData({ ...newEmployee, [name]: value });
        } else {
          validateData(updatedEmployee);
        }
        };

        const validateData = (employee) => {
        if (employee.firstName.trim().length === 0 || employee.lastName.trim().length === 0 || employee.skill.trim().length === 0) {
            setValid(false);
        } else {
            setValid(true);
        }
    };
      
        const handleAdd = () => {
        if (!valid) {
          return;
        }
        const updatedEmployee = {
          id: employeesCount.current + 1,
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          skill: newEmployee.skill,
        };
        setListOfEmployees((prevEmployees) => [...prevEmployees, updatedEmployee]);
        employeesCount.current++;
        setNewEmployee({
          id: employeesCount.current + 1,
          firstName: "",
          lastName: "",
          skill: "",
        });
        setValid(false);
    };
    
    const handleBlur = (event) => {
        const { name, value } = event.target;
        const updatedEmployee = { ...newEmployee, [name]: value };
        setNewEmployee(updatedEmployee);
        validateData(updatedEmployee);
      };

  const handleDelete = (idToDelete) => {
    setListOfEmployees(listOfEmployees.filter((employee) => employee.id !== idToDelete));
  };

  return (
    <PageContainer>
      <Buttons>
        <TabButton
          name="list-of-employees"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-employees")}
        >
          Seznam programátorů
        </TabButton>
        <TabButton
          name="planning-of-excavation"
          data-active={activeTab}
          onClick={() => setActiveTab("planning-of-excavation")}
        >
          Plánování
        </TabButton>
      </Buttons>
      {activeTab === "list-of-employees" && (
        <>
          <EmployeeList name="employeeList">
            {listOfEmployees.map((employee) => (
              <EmployeeItem key={employee.id}>
                {employee.firstName} {employee.lastName} - {employee.skill}
                <button
                  style={{
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "50%",
                    height: "25px",
                    width: "25px",
                    background: "white",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => handleDelete(employee.id)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffb3b3")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                >
                  x
                </button>
              </EmployeeItem>
            ))}
          </EmployeeList>
          <EmployeeForm>
            <Input
                type="text"
                placeholder="Jméno"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input
                type="text"
                placeholder="Příjmení"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Input as="select" name="skill" value={newEmployee.skill} onChange={handleChange}>
                <option value="">Pracovní pozice</option>
                {skills.map((skill) => (
                <option key={skill} value={skill}>
                    {skill}
                </option>
                ))}
            </Input>
            <ButtonAdd disabled={!valid} onClick={handleAdd}>
                Přidat
            </ButtonAdd>
            </EmployeeForm>

        </>
      )}
      {activeTab === "planning-of-excavation" && (
        <>
          <h3>
            <strong>
              <u>Plánování prací</u>
            </strong>
          </h3>{" "}
          <br />
          <Text>Počet seniorů: {seniorCount}</Text>
          <Text>Počet juniorů: {juniorCount}</Text>
          <Text>Celkový výkon programátorů: {totalPerformance}<small> řádky/dny</small> </Text>
          <ExcavationForm>
            řádky:
            <Input
              type="number"
              min="0"
              placeholder="řádky"
              name="planed_meters"
              value={planedMeters}
              onChange={(e) => setPlanedMeters(e.target.value)}
            />
            dny:
            <Input
              type="number"
              min="0"
              placeholder="dny"
              name="planed_hours"
              value={planedHours}
              onChange={(e) => setPlanedHours(e.target.value)}
            />
            <br />
            <Button
              style={{ backgroundColor: isButtonEnabled ? "green" : "red" }}
              onClick={handleScheduleWork}
              disabled={!isButtonEnabled}
            >
              Zaplánování práce
            </Button>
          </ExcavationForm>
        </>
      )}
    </PageContainer>
  );
}
