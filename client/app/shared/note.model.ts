export class Note {
    constructor(
      public _id: string,
      public userId: string,
      public description: string,
      public date: Date,
      public isHighPriority: boolean,
    ) {}
  }