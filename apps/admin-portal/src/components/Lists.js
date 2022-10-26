
import { Button, Datagrid, Edit, EditButton, List, SimpleForm, TextField, TextInput } from 'react-admin';

export const CityList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="id" />
            <EditButton basepath='/name' ></EditButton> 
        </Datagrid>
    </List>
);


export const CityEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="id" disabled/>
        </SimpleForm>
    </Edit>
);