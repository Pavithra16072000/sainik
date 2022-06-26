import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_form_details = db.define('u_form_details',{

    Service_No:{
        type: DataTypes.STRING(12)
    },
    Service_Name:{
        type: DataTypes.STRING(15)
    },
    Corps_Name:{
        type: DataTypes.STRING(25)
    },
    Record_Office_Name:{
        type: DataTypes.STRING(25)
    },
    Rank_Category:{
        type: DataTypes.STRING(30)
    },
    Group_Name:{
      type: DataTypes.STRING(1)
    },
    Trade_Name:{
        type: DataTypes.STRING(30)
    },
    Rank_Name:{
        type: DataTypes.STRING(35)
    },
    Name:{
        type: DataTypes.STRING(75)
    },
    Gender:{
        type: DataTypes.STRING(11)
    },
    DOB:{
        type: DataTypes.DATEONLY
    },
    Enroll_Date:{
        type: DataTypes.DATEONLY
    },
    World_War2:{
        type: DataTypes.STRING(8)
    },
    Opt_Attend:{
        type: DataTypes.STRING(100)
    },
    Deco:{
        type: DataTypes.STRING(35)
    },


//Form2 Table

    Unit_Last_Served:{
        type: DataTypes.STRING(20)
    },
    Discharge_Date:{
        type: DataTypes.DATEONLY
    },
    Discharge_Reason:{
        type: DataTypes.STRING(30)
    },
    Discharge_Med_Cat:{
        type: DataTypes.STRING(20)
    },
    Discharge_Character:{
      type: DataTypes.STRING(15)
    },
    Discharge_Book_No:{
        type: DataTypes.STRING(8)
    },
    If_Pensioner:{
        type: DataTypes.STRING(4)
    },
    PPO_No:{
        type: DataTypes.STRING(20)
    },
    Pension_Sanctioned:{
        type: DataTypes.STRING(6)
    },
    If_Sanctioned_Dis_Pension:{
        type: DataTypes.STRING(4)
    },
    Disability_Pension:{
        type: DataTypes.STRING(6)
    },
    Disability_Percentage:{
        type: DataTypes.STRING(4)
    },
    Pension_AC_No:{
        type: DataTypes.STRING(12)
    },
    Bank_Name:{
        type: DataTypes.STRING(60)
    },
    Branch:{
        type: DataTypes.STRING(60)
    },
    IFSC:{
        type: DataTypes.STRING(15)
    },



//Form3 Table
    Father_Name:{
        type: DataTypes.STRING(75)
    },
    Mother_Name:{
        type: DataTypes.STRING(75)
    },
    Religion:{
        type: DataTypes.STRING(25)
    },
    Caste_Category:{
        type: DataTypes.STRING(10)
    },
    Birth_State:{
      type: DataTypes.STRING(25)
    },
    Birth_Dist_Surname:{
      type: DataTypes.STRING(30)
    },
    Birth_Place:{
        type: DataTypes.STRING(30)
    },
    Adhaar:{
        type: DataTypes.STRING(12)
    },
    Voter_Id:{
        type: DataTypes.STRING(10)
    },
    PAN:{
        type: DataTypes.STRING(10)
    },
    CSD:{
        type: DataTypes.STRING(15)
    },
    ECHS:{
        type: DataTypes.STRING(15)
    },
    Id_Mark1:{
        type: DataTypes.STRING(60)
    },
    Id_Mark2:{
        type: DataTypes.STRING(60)
    },


  //Form4 Table

  Pincode:{
     type: DataTypes.STRING(6)
 },
 State:{
     type: DataTypes.STRING(25)
 },
 District:{
     type: DataTypes.STRING(50)
 },
 Taluk_Name:{
     type: DataTypes.STRING(20)
 },
 City_Village:{
     type: DataTypes.STRING(30)
 },
 Locality:{
     type: DataTypes.STRING(30)
 },
 Police_Station:{
   type: DataTypes.STRING(15)
 },
  Street:{
     type: DataTypes.STRING(50)
 },
 House_No:{
     type: DataTypes.STRING(6)
 },
 House_Name:{
     type: DataTypes.STRING(25)
 },
Tele_No:{
     type: DataTypes.STRING(14)
 },
Same:{
     type: DataTypes.TINYINT
 },

  P_Pincode:{
     type: DataTypes.STRING(6)
 },

 P_State:{
     type: DataTypes.STRING(25)
 },
 P_District:{
     type: DataTypes.STRING(50)
 },
 P_Taluk_Name:{
     type: DataTypes.STRING(20)
 },
 P_Police_Station:{
     type: DataTypes.STRING(15)
 },
 P_Street:{
     type: DataTypes.STRING(50)
 },
 P_City_Village:{
     type: DataTypes.STRING(30)
 },
 P_Locality:{
     type: DataTypes.STRING(30)
 },
 P_House_No:{
     type: DataTypes.STRING(6)
 },
 P_House_Name:{
     type: DataTypes.STRING(25)
 },

//Form5 table

Civil_Qualification:{
    type: DataTypes.STRING(20)
},
Addi_Course:{
    type: DataTypes.STRING(20)
},

Equi_Test:{
    type: DataTypes.STRING(10)
},
Civil_Emp_Status:{
    type: DataTypes.STRING(20)
},
Sector:{
  type: DataTypes.STRING(25)
},
Dept:{
  type: DataTypes.STRING(25)
},
Pres_Desg:{
    type: DataTypes.STRING(20)
},
Employer:{
    type: DataTypes.STRING(20)
},
Month_Income:{
    type: DataTypes.STRING(8)
},
Official_No:{
    type: DataTypes.STRING(14)
},
Desg_Retire:{
    type: DataTypes.STRING(6)
},
Retire_Date:{
    type: DataTypes.DATEONLY
},
Civil_PPO_No:{
    type: DataTypes.STRING(20)
},

//Form6 table

Marital_Status:{
    type: DataTypes.STRING(8)
},
Marriage_Date:{
    type: DataTypes.DATEONLY
},
Spouse_Name:{
    type: DataTypes.STRING(75)
},
Spouse_Relation:{
    type: DataTypes.STRING(7)
},
Spouse_DOB:{
  type: DataTypes.DATEONLY
},
Spouse_Id_Mark:{
    type: DataTypes.STRING(60)
},
Spouse_Qualification:{
    type: DataTypes.STRING(20)
},
Spouse_Emp_Status:{
    type: DataTypes.STRING(15)
},
Spouse_Emp_Profession:{
    type: DataTypes.STRING(20)
},
Spouse_Retirement_Date:{
    type: DataTypes.DATEONLY
},
Spouse_Adhaar:{
    type: DataTypes.STRING(12)
},
Spouse_Voter_Id:{
    type: DataTypes.STRING(10)
},
Spouse_PAN:{
    type: DataTypes.STRING(10)
},
Spouse_CSD:{
    type: DataTypes.STRING(15)
},
Spouse_ECHS:{
    type: DataTypes.STRING(15)
},
 Sector:{
  type: DataTypes.STRING(25)
},
Dept:{
  type: DataTypes.STRING(25)
},
Pres_Desg:{
    type: DataTypes.STRING(20)
},
Employer:{
    type: DataTypes.STRING(20)
},
Spouse_Month_Income:{
    type: DataTypes.STRING(8)
},
Spouse_Official_No:{
    type: DataTypes.STRING(14)
},
Spouse_Desg_Retire:{
    type: DataTypes.STRING(6)
},
Spouse_Retire_Date:{
    type: DataTypes.DATEONLY
},
Spouse_Civil_PPO_No:{
    type: DataTypes.STRING(20)
},


},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default u_form_details;
