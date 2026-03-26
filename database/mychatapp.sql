CREATE DATABASE MyChatAppDb
GO

USE MyChatAppDb
GO

CREATE SCHEMA MyChatAppSchema
GO

CREATE TABLE MyChatAppSchema.Users
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(200) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);

SELECT * FROM MyChatAppSchema.Users

CREATE TABLE MyChatAppSchema.Messages
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    SenderId INT NOT NULL,
    ReceiverId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    Timestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Messages_Sender 
        FOREIGN KEY (SenderId) REFERENCES MyChatAppSchema.Users(Id),

    CONSTRAINT FK_Messages_Receiver 
        FOREIGN KEY (ReceiverId) REFERENCES MyChatAppSchema.Users(Id)
);

-- Indexes
CREATE INDEX IX_Messages_SenderId 
ON MyChatAppSchema.Messages(SenderId);

CREATE INDEX IX_Messages_ReceiverId 
ON MyChatAppSchema.Messages(ReceiverId);