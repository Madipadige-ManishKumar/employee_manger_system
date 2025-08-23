from flask_pack import app,db,login_manager
from flask_pack.models import User,emphour,empholidays
from flask_pack.models import empholidays_reason as er 
from flask_pack.models import emphour_m as em 
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user,logout_user
from flask import render_template,request,jsonify

import bcrypt
import datetime
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
  # allow React to access Flask API

#function section 
def holiday_cal(emp):
    do=datetime.datetime.now()
    mon1=num_to_month(do.month)
    mon=hoildays(emp,int(do.month)-1)
    new_value=getattr(emp,mon1)
    new_value = int(int(new_value)+int(mon))
    setattr(emp,mon1,new_value)
    db.session.commit()
    


def convert_to_seconds(time_str):
    time_parts = list(map(int, time_str.split(':')))
    return time_parts[0] * 3600 + time_parts[1] * 60 + time_parts[2]

def convert_to_hms(total_seconds):
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    return f"{hours:02}:{minutes:02}:{seconds:02}"

def hash_password(password):
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def check_password(password, hashed_password):
    # Check if the entered password matches the hashed password
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def num_to_month(a):
    l=["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

    return l[int(a)]
def hoildays(emp,a):
    value= num_to_month(a)
    val=getattr(emp,value)
    setattr(emp,value,"0")
    return val
def add_data(emp,m,s):
    value=getattr(emp,m)
    value=str(value)+str(s)
    setattr(emp,m,value)
    db.session.commit()
#class section 
class employee:
    def data_spilt(self,data):
        parts = data.split('_')[1:]  # Split from the first ':' to the end
        result = [part.split(';')[0] for part in parts]
        self.date=[]
        self.login=[]
        self.logout=[]
        self.hrs=[]
        for i in range(len(result)):
            if i%4==0:
                self.date.append(result[i])
            elif i%4==1:
                self.login.append(result[i])
            elif i%4==2:
                self.logout.append(result[i])
            elif i%4==3:
                self.hrs.append(result[i])
    def data_split1(self,data):
        parts = data.split(':')[1:]  # Split from the first ':' to the end
        result = [part.split(';')[0] for part in parts]
        self.date=[]
        self.reason=[]
        for i in range(len(result)):
            if i%2==0:
                self.date.append(result[i])
            elif i%2 ==1:
                self.reason.append(result[i]) 
#route section 
@app.route('/')
def hello_world():
    return render_template("home.html")
@app.route('/login')
def login():
    time=datetime.datetime.now()
    return render_template("login_page.html",alert="")
@app.route('/loginauth',methods=['POST'])
def loginauth():
    data = request.get_json()
    U_name=str(data.get("email"))
    P_word=str(data.get("password"))
    cur_date=datetime.datetime.now()
    if U_name=="admin" and P_word=="admin":
        users=User.query.all()
        return jsonify({"success": True, "message": "Admin login successful", "role": "admin", "token": "admin123"}), 200
        
    else:
        specific_user_name = User.query.filter_by(username=U_name).first()
        specific_user_password="xyz"
        if  specific_user_name==None  or specific_user_name.password==None:
            return jsonify({"success": False, "message": "Invalid user, please try again"}), 401
        specific_user_password=check_password(P_word,specific_user_name.password)
        if specific_user_name and specific_user_password:
            login_user(specific_user_name)
            user=User.query.filter_by(username=current_user.username).first()
            emp=emphour.query.filter_by(username=current_user.username).first()
            curdate=cur_date.date()
            mon=num_to_month(cur_date.month)
            curtime=str(cur_date.time())
            curtime=curtime.split('.')[0]
            user.curtime=str(curtime)
            user.Time+=str("date_"+str(curdate)+";login_"+str(curtime)+";")
            add_data(emp,mon,str("date_"+str(curdate)+";login_"+str(curtime)+";"))
            db.session.commit()
            return jsonify({
        "success": True,
        "message": "Login successful",
        "email": user.username,  # or user.email depending on your field
        "token": "abc123",
        "role": "user",
        "U_name": user.username,
        "Designation": user.Designation,
        "Department_Working": user.Department_Working,
        "Reporting_Manager": user.Reporting_Manager,
        "skills": user.skills,
        "Available_leaves": user.Avaiable_leaves
        }), 200
        else:
            return  jsonify({"success": False, "message": "Login failed", "token": "abcd123"}), 401
@login_manager.user_loader 
def load_user(user_id):
    return User.query.get(int(user_id))
@app.route("/Logout")
@login_required
def Logout():
    user=User.query.filter_by(username=current_user.username).first()
    emp=emphour.query.filter_by(username=current_user.username).first()
    dt=datetime.datetime.now()
    mon=num_to_month(dt.month)
    logouttime=str(dt.time())
    logouttime=logouttime.split('.')[0]
    curtime=str(user.curtime)
    curtime=curtime.split('.')[0]
    logouttime=convert_to_seconds(logouttime)
    curtime=convert_to_seconds(curtime)
    time=logouttime-curtime
    logouttime=convert_to_hms(logouttime)
    time=convert_to_hms(time)
    user.Time+=f"logouttime_{logouttime};hrs_{time};"
    em1=em.query.filter_by(username=current_user.username).first()
    value=str(getattr(em1,mon))
    value=value.split('.')[0]
    value=convert_to_seconds(value)
    time=convert_to_seconds(time)
    time=time+value
    time=convert_to_hms(time)
    setattr(em1,mon,time)
    add_data(emp,mon,str("logout_"+str(logouttime)+";Hours_"+str(time)+";"))
    db.session.commit()
    logout_user()
    return render_template("home.html")
@app.route("/EmpDetails")
@login_required
def Account():
    user=User.query.filter_by(username=current_user.username,password=current_user.password).first()
@app.route("/signup")
def signup():
    return render_template("signup.html")
@app.route("/adduser")
def adduser():
    return render_template("adduser.html")
@app.route("/signupauth",methods=['POST'])
def signupauth():
    U_name=str(request.form['U_name'])
    P_word=str(request.form['P_word'])
    designation = str(request.form['designation'])
    Department = str(request.form.get('Department'))
    report = str(request.form['Report'])
    skills = str(request.form['skills'])
    P_word=hash_password(P_word)
    user=User(username=U_name,password=P_word,Designation=designation,Department_Working=Department,Reporting_Manager=report,skills=skills,Avaiable_leaves=20,Time='',Leaves='')
    db.session.add(user)
    emp=emphour(username=U_name,JAN="",FEB="",MAR="",APR="",JUN="",JUL="",AUG="",SEP="",OCT="",NOV="",DEC="")
    db.session.add(emp)
    emp1=empholidays(username=U_name,JAN="2",FEB="2",MAR="2",APR="2",MAY="2",JUN="2",JUL="2",AUG="2",SEP="2",OCT="2",NOV="2",DEC="2")
    db.session.add(emp1)
    emp1=er(username=U_name,JAN="",FEB="",MAR="",APR="",MAY="",JUN="",JUL="",AUG="",SEP="",OCT="",NOV="",DEC="")
    db.session.add(emp1)
    mp1=em(username=U_name,JAN="00:00:00",FEB="00:00:00",MAR="00:00:00",APR="00:00:00",MAY="00:00:00",JUN="00:00:00",JUL="00:00:00",AUG="00:00:00",SEP="00:00:00",OCT="00:00:00",NOV="00:00:00",DEC="00:00:00",Department_Working=Department)
    db.session.add(mp1)
    db.session.commit()
    return render_template("login_page.html")
@app.route("/emp")
def emp_details():
    user=User.query.filter_by(username=current_user.username).first()
    return render_template("profile.html",U_name=user.username,Designation=user.Designation,Department_Working=user.Department_Working,Reporting_Manager=user.Reporting_Manager,skills=user.skills,Avaiable_leaves=user.Avaiable_leaves)
@app.route("/Apply")
def Apply_leave():
    user=User.query.filter_by(username=current_user.username).first()
    dt =datetime.datetime.now()
    emp=empholidays.query.filter_by(username=current_user.username).first()
    if dt.month==1:
        user.Avaiable_leaves=24
        emp.JAN=emp=FEB=emp.MAR=emp.APR=emp.MAY=emp.JUN=emp.JUL=emp.AUG=emp.SEP=emp.OCT=emp.NOV=emp.DEC=2

    leaves=int(user.Avaiable_leaves)
    reporting_manager=user.Reporting_Manager
    holiday_cal(emp)
    cur_leave=datetime.datetime.now()
    mon=num_to_month(cur_leave.month)
    value=int(getattr(emp,mon))
    if value >0:
        value=value
    else:
        value="This month you don't have leaves"
    return render_template("applyleave.html",leaves=leaves,rm=reporting_manager,msg="",value=value)
@app.route("/submitleave",methods=['POST'])
def submitleave():
    
    data = request.get_json()
    print("this Data",data)
    user=User.query.filter_by(username=data.get("email")).first()
    date=str(data.get("dl"))
    date1=str(data.get("dl1"))
    reason=str(data.get("reason"))
    history_data=str(user.Leaves)
    leaves=int(user.Avaiable_leaves)
    do=datetime.datetime.strptime(date,"%Y-%m-%d")
    do1=datetime.datetime.strptime(date1,"%Y-%m-%d")
    diff=(do1-do).days
    print(f"This is the Difference {diff} The first date is {do1} and Second date is {do} ")
    print(do.month)
    date=f"{date}-{date1}"
    history_data+="date:"+str(date)+";reason:"+str(reason)+";"
    user.Avaiable_leaves=str(leaves-diff)
    user.Leaves+=str(history_data)
    month=num_to_month(do.month)
    print(f"The month is {month}")
    emp=empholidays.query.filter_by(username=data.get("email")).first()
    emph=er.query.filter_by(username=data.get("email")).first()
    add_data(emph,month,"date:"+str(date)+";reason:"+str(reason)+";")
    do=datetime.datetime.now()
    month=num_to_month(do.month)
    value=getattr(emp,month)
    value1=int(value)-diff
    setattr(emp,month,value1)
    print(user.Avaiable_leaves)
    if value1 >0:
        value1=value1
        print("CAme until here if ")
    else:
        value1="This month you don't have leaves"
    db.session.commit()
    print("CAme until here ee")
    return  jsonify({"success": True, "available_leaves": user.Avaiable_leaves}), 200

@app.route("/attreport",methods=["POST"])
def attendence_report():
    print("in the method")
    data = request.get_json()
    user_name=data.get("email")
    user=User.query.filter_by(username=user_name).first()
    emp = employee()
    emp.data_spilt(user.Time)
    emp1=em.query.filter_by(username=user_name).first()
    dt=datetime.datetime.now()
    mon=num_to_month(dt.month)
    thrs=getattr(emp1,mon)
    print(thrs)
    return jsonify({"success": True, "res":emp,"thrs":thrs}),200
@app.route("/check",methods=["POST"])
def check():
    
    u_name_emp=str(request.form.get("emp"))
    mode= int(request.form.get("mode"))
    mon=str(request.form.get("month"))
    emp1=employee()
    users=User.query.all()
    if mode ==1:
        emp=emphour.query.filter_by(username=u_name_emp).first()
        value=getattr(emp,mon)
        emp1.data_spilt(str(value))
        del emp
        emp=em.query.filter_by(username=u_name_emp).first()
        value=getattr(emp,mon)
        return render_template("adminatt.html",res=emp1,users=users,thrs=value)
    elif mode ==2:
        emp=er.query.filter_by(username=u_name_emp).first()
        value=getattr(emp,mon)
        emp1.data_split1(str(value))
        return render_template("adminleave.html",res=emp1,users=users)
@app.route("/emphrs")
def  emphrs():
    users=User.query.all()
    l=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    return render_template("emphrs.html",users=users,mon=l)
@app.route("/depthrs")
def department_hours():
    l=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    return render_template("depthrs.html",mon=l)
@app.route("/depthrsub",methods=["POST"])
def depthrsub():
    dept=str(request.form.get("dept"))
    mon=str(request.form.get("month"))
    users=em.query.filter_by(Department_Working=dept).all()
    sum=0
    usernames=[]
    hrs=[]
    for user in users:
        usernames.append(user.username)
        value=getattr(user,mon)
        hrs.append(value)
        value=convert_to_seconds(value)
        sum+=int(value)
    sum=convert_to_hms(sum)
    return render_template("depthrsub.html",sum=sum,usernames=usernames,hrs=hrs)
@app.route("/empdet")
def empdet():
    users=User.query.all()
    return render_template("empdet.html",users=users)
@app.route("/empedit",methods=['POST'])
def empedit():
    emp=str(request.form.get('emp'))
    user=User.query.filter_by(username=emp).first()
    return render_template("empedit.html",user=user)
@app.route("/empeditsub",methods=['POST'])
def empeditsub():
    U_name=str(request.form['U_name'])
    designation = str(request.form['designation'])
    Department = str(request.form['Department'])
    report = str(request.form['Report'])
    al = str(request.form['al'])
    user=User.query.filter_by(username=U_name).first()
    emp=em.query.filter_by(username=U_name).first()
    user.Designation=designation
    em.Designation=designation
    user.Department_Working=Department
    user.Reporting_Manager=report
    user.Avaiable_leaves=al
    db.session.commit()
    del user
    users=User.query.all()
    return render_template("adminpanel.html",users=users)
@app.route("/enter_p")
def enter_p():
    return render_template("enter_p.html",msg=None)
@app.route("/enter_pauth",methods=['POST'])
def enter_pauth():
    user=User.query.filter_by(username=current_user.username).first()
    p_word=str(request.form.get("P_word"))
    print(p_word)
    flag=check_password(p_word,user.password)
    if flag:
        return render_template("change_p.html")
    else:
        return render_template("enter_p.html",msg="Enter Correct Password")
@app.route("/change_p",methods=['POST'])
def change_p():
    user=User.query.filter_by(username=current_user.username).first()
    p_word=str(request.form.get("P_word"))
    p_word=hash_password(p_word)
    user.password=p_word
    db.session.commit()
    return render_template("profile.html",U_name=user.username,Designation=user.Designation,Department_Working=user.Department_Working,Reporting_Manager=user.Reporting_Manager,skills=user.skills,Avaiable_leaves=user.Avaiable_leaves)
@app.route("/export")
def export():
    user=User.query.filter_by(username=current_user.username).first()
    emp = employee()
    emp.data_spilt(user.Time)
    print(emp.date)
    print(emp.login)
    print(emp.logout)
    print(emp.hrs)
    with open("output.csv","w") as f:
        f.write("Date,Login,Logout,Hours"+"\n")
        if (len(emp.date)==len(emp.hrs)):
            for i in range(len(emp.date)):
                f.write(emp.date[i]+","+emp.login[i]+","+emp.logout[i]+","+emp.hrs[i]+"\n")
        elif(len(emp.date)>len(emp.hrs) and len(emp.hrs)!=0):
            n=0
            for i in range(len(emp.hrs)):
              n=n+1
              f.write(emp.date[i]+","+emp.login[i]+","+emp.logout[i]+","+emp.hrs[i]+"\n")
            n=n+1
            f.write(emp.date[i]+","+emp.login[i]+",")
        elif(len(emp.date)>len(emp.hrs) and len(emp.hrs)==0):
            f.write(emp.date[0]+","+emp.login[0]+",")
    return  "Done"

@app.route("/export1",methods=["POST"])
def export1():
    res=(request.form.get("res"))
    res1=request.form.get("res1")
    res2=request.form.get("res2")
    res3=request.form.get("res3")
    return  str(res)
    # emp = employee()
    
    # if mode ==1:
    #     emp1=emphour.query.filter_by(username=u_name_emp).first()
    #     value=getattr(emp1,mon)
    #     emp.data_spilt(value)
    #     with open("output.csv","w") as f:
    #         f.write("Date,Login,Logout,Hours"+"\n")
    #         if (len(emp.date)==len(emp.hrs)):
    #             for i in range(len(emp.date)):
    #                 f.write(emp.date[i]+","+emp.login[i]+","+emp.logout[i]+","+emp.hrs[i]+"\n")
    #         elif(len(emp.date)>len(emp.hrs) and len(emp.hrs)!=0):
    #             n=0
    #             for i in range(len(emp.hrs)):
    #                 n=n+1   
    #                 f.write(emp.date[i]+","+emp.login[i]+","+emp.logout[i]+","+emp.hrs[i]+"\n")
    #             n=n+1
    #             f.write(emp.date[i]+","+emp.login[i]+",")
    #         elif(len(emp.date)>len(emp.hrs) and len(emp.hrs)==0):
    #             f.write(emp.date[0]+","+emp.login[0]+",")
    #     del emp1
    # elif mode ==2:
    #     emp1=er.query.filter_by(username=u_name_emp).first()
    #     value=getattr(emp1,mon)
    #     with open("output.csv","w") as f:
    #         for i in range(len(emp.date)):
    #                 f.write(emp.date[i]+","+emp.reason[i]+"\n")
    # return  "Done"

