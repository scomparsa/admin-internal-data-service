import { Table, Model, Column, DataType } from 'sequelize-typescript'
import { Op, fn, col } from 'sequelize'
import { AD_MAPPING } from '@/constants/ad-data'

export interface BluedAdm {
  getListByCustomArgs(args: ICustomArgs): Promise<BluedAdmModel[]>
}

interface ICustomArgs {
  start: string
  end: string
  group: string[]
  show: string[]
  adType?: number[]
  region?: string[]
  platform?: number
  adId?: string
}

@Table({ tableName: 'blued_adm' })
export default class BluedAdmModel extends Model<BluedAdmModel> {
  @Column({
    field: 'adm_id',
    type: DataType.INTEGER(11),
    primaryKey: true,
  })
  admId: number

  static async getListByCustomArgs({
    start,
    end,
    adId,
    adType,
    region,
    platform,
    show,
    group,
  }: ICustomArgs): Promise<BluedAdmModel[]> {
    const dataList = this.findAll({
      where,
      group: group.length ? group : [],
    })

    return dataList
  }
}
