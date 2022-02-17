import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import MotionHoc from '../../services/motionhoc';
import TablaCliente from './tablaCliente';
import TablaImg from './tablaImg';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
          <Typography>{children}</Typography>
    
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
 const TabConfigComponent = ()=> {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box >
        <Tabs   TabIndicatorProps={{style: {background:'white'}}}  variant="fullWidth"  sx={{ bgcolor: "var(--black)",color:"white",borderBottomColor:"white" }}  textColor="inherit"  value={value} onChange={handleChange}>
          <Tab icon={<PersonIcon>   </PersonIcon>} iconPosition="start" label="Lista de clientes" {...a11yProps(0)} />
          <Tab icon={<ImageIcon>   </ImageIcon>} iconPosition="start" label="Lista de imagenes" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TablaCliente></TablaCliente>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <TablaImg></TablaImg>
      </TabPanel>

    </Box>
  );
}

const TabConfig = MotionHoc(TabConfigComponent);
export default TabConfig;