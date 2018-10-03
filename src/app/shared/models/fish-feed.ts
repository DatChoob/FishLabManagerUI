export class FishFeed{

    idFishFed :number;
    //name is in pcode
    participantCode :string;
    status: string;
    date :string;
    dateTimeUpdated:string;
    // idFishFed = db.Column(db.Integer, primary_key = True, nullable = False, autoincrement=True)
    // participantCode = db.Column(db.String(255), db.ForeignKey('Participant.participantCode'))
    // status = db.Column(db.String(45), nullable = False, default = 'Not Fed')
    // date = db.Column(db.Date, nullable = False, unique = True )
    // dateTimeUpdated = db.Column(db.DateTime, nullable = True )
}