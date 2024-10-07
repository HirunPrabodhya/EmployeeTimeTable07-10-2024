export interface IEmployee {
    divisionName: string
    employeeName: string
    employeeId: number
    month: string
    epfNumber: number
    totalNormalHours: number
    totalWorkHours: number
    totalOtHours: number
    totalLateDays: number
    dailySums: IDailySum[]
  }
  
  export interface IDailySum {
    inDate: string
    inTime: string
    outTime: string
    inDate_: string
    outDate: string
    dataRowId: number
    totalWorkedHours: number
    lateCount: number
    sumOtHours: string
    dailySumRecordCount: number
    timePortionSums: ITimePortionSum[]
  }
  
  export interface ITimePortionSum {
    inDate: string
    inTime: string
    outTime: string
    outDate: string
    sectionId: number
    normalHours: number
    overTimeHours: number
    dayDetaiPieceRates: IDayDetaiPieceRate[]
  }
  
  export interface IDayDetaiPieceRate {}
  