CREATE TABLE IF NOT EXISTS students (StudentID INTEGER,StudentName TEXT, StudentBirthday TEXT,StudentSize INTEGER,StudentKilo INTEGER,StudentPicture TEXT,StudentClass INTEGER);
CREATE TABLE IF NOT EXISTS parents (ParentID INTEGER, ParentName TEXT, ParentPhoneNumber TEXT, ParentEmail TEXT, ParentJob TEXT, StudentID INTEGER);

CREATE TABLE IF NOT EXISTS `conversation` (
`ConversationID` INTEGER NOT NULL,
`ConversationTitle` TEXT NOT NULL,
`SenderID` TEXT NOT NULL,
`ReceiverID` INTEGER NOT NULL,
`ConversationStatus` INTEGER NOT NULL DEFAULT '0',
`ConversationDate` datetime NOT NULL,
`ConversationLatestMessage` TEXT NOT NULL,
PRIMARY KEY (`ConversationID`)
);

CREATE TABLE IF NOT EXISTS `conversation_messages` (
`MessageID` INTEGER NOT NULL ,
`Message` text NOT NULL,
`SenderID` INTEGER NOT NULL,
`ReceiverID` INTEGER NOT NULL,
`ConversationID` INTEGER NOT NULL,
`MessageDate` datetime NOT NULL,
PRIMARY KEY (`MessageID`)
);

CREATE TABLE IF NOT EXISTS `activities` (
`ActivityID` INTEGER NOT NULL,
`ActivityTitle` TEXT NOT NULL,
`ActivityContent` TEXT NOT NULL,
`ActivityDate` TEXT NOT NULL,
`favorite` INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `teachers` (
`TeacherID` INTEGER NOT NULL ,
`TeacherName` TEXT NOT NULL,
`TeacherDepartment` TEXT NOT NULL,
`TeacherPicture` TEXT NOT NULL,
`favorite` INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `dailyreport` (
`IndexID` INTEGER,
`ReportDate` TEXT,
`paylasimci` INTEGER,
`katilimci` INTEGER,
`dinleyici` INTEGER,
`hareketli` INTEGER,
`ingilizce` INTEGER,
`satranc` INTEGER,
`resim` INTEGER,
`matematik` INTEGER,
`fen` INTEGER,
`StudentID` INTEGER
);