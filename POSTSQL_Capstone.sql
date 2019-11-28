--Most updated version of the database on PostgreSQL




CREATE TABLE UserProfile (
    KirboID int,
    FirstName varchar(255),
	LastName varchar(255),
    Major varchar(255),
    email varchar(255)UNIQUE,
    loginPW varchar(255)not null,
    profileImage bytea,
    UserLevel int,
    UserExp int,
    SuperUserFlag int,
Primary Key (KirboID)
);

Create Table AllBadges(
    BadgeKey int,
    BadgeImg bytea,
Primary Key (BadgeKey)
);

CREATE TABLE UserBadges(
    ProfileID int,
    BadgesID int,
    BadgeKey int,
CONSTRAINT FK_ProfileID
    FOREIGN KEY (ProfileID)
    REFERENCES UserProfile(KirboID),      
 CONSTRAINT FK_AllBadges
    FOREIGN KEY (BadgeKey)
    REFERENCES AllBadges(BadgeKey)
);

Create Table KirboProjects(
    ProjectID int,
    projectName varchar(255),
    Primary Key (ProjectID)
);

Create Table AssignedTasks (
    TasksID int,
    KirboID int,
    ProjectID int,
    SubmissionID int UNIQUE,
    TaskName varchar(255),
    TaskValue int,
    completeFlag int,
    smallComment varchar(255),
    dueDate Date,
    assignedFlag int,
    Primary Key (TasksID),
CONSTRAINT TFK_ProfileID
    FOREIGN KEY (KirboID)
    REFERENCES UserProfile(KirboID),
CONSTRAINT APFK_ProjectID
    FOREIGN KEY (ProjectID)
    REFERENCES KirboProjects(ProjectID)      

);


Create Table AssignedProjects(
    KirboID int,
    ProjectID int,
CONSTRAINT APFK_ProfileID
    FOREIGN KEY (KirboID)
    REFERENCES UserProfile(KirboID), 
CONSTRAINT AFK_ProjectID
    FOREIGN KEY (ProjectID)
    REFERENCES KirboProjects(ProjectID)  

);


Create Table Submissions(
    TasksID int,
    SubmissionID int,
    submittedFiles bytea,
    turnedIn Date,
CONSTRAINT SFK_TaskID
    FOREIGN KEY (TasksID)
    REFERENCES AssignedTasks(TasksID), 
CONSTRAINT SFK_SubmittedID
    FOREIGN KEY (SubmissionID)
    REFERENCES AssignedTasks(SubmissionID)
);
