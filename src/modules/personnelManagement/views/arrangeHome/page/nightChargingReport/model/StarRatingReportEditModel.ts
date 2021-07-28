import { appStore } from "src/stores";
import { observable, computed, action } from "mobx";
import React from "react";

import createModal from "src/libs/createModal";
import BaseModal from "./../components/base/BaseModal";

import { sectionList } from "./../config/sectionList";

import { starRatingReportService } from "./../api/StarRatingReportService";
import { AllData, DeptItem, DetailItem } from "./../types";
import qs from "qs";
import { numToChinese } from "src/utils/number/numToChinese";

export interface SectionListItem {
  sectionId?: string;

  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  data?: any;
  modal?: any;
  section?: any;
  modalWidth?: any;
}

interface ModalCase {
  show: (...arr: any) => void;

  hide(): void;

  Component: any;
}

interface SectionCase {
  sectionId?: string;
  sectionTitle?: string;
  modalTitle?: string;
  modalWidth?: any;
  data?: any;
  modal?: any;
  section?: any;
}

class StarRatingReportEditModel {
  @observable baseModal: ModalCase | null = null;
  @observable public sectionList: SectionListItem[] = sectionList;
  @observable public allData: Partial<AllData> = {
    report: {}
  };

  /** 返回组件实例 */
  @action
  getSection(sectionId: string): SectionCase | null {
    let obj = this.sectionList.find(item => item.sectionId == sectionId);
    if (obj) {
      return obj;
    } else {
      return null;
    }
  }

  /** 打开弹窗 */
  @action
  openEditModal(sectionId: string) {
    let obj = this.getSection(sectionId);
    this.baseModal && obj && this.baseModal.show({
      Component: obj.modal,
      sectionData: this.getSection(sectionId)
    });
  }

  /** 获取组件数据 */
  @action
  getSectionData(sectionId: string) {
    let obj = this.getSection(sectionId);
    if (obj) {
      return obj.data;
    } else {
      return null;
    }
  }

  /** 设置组件数据 */
  @action
  setSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId);
    if (obj) {
      Object.assign(obj.data, data);
      return true;
    } else {
      return false;
    }
  }

  /** 提取总数据 */
  getDataInAllData(key: string) {
    return this.allData[key] || {};
  }

  get report() {
    return this.getDataInAllData("report") || {};
  }

  /** 数据初始化 */
  async initData(query?: any) {
    const { data } = await starRatingReportService.getReport(query)
    this.getSectionData("报告名称")!.text = appStore.queryObj.name

    if (['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
      this.allData = data.list1
      this.getSectionData("夜班费上报表")!.list = data.list1
      this.getSectionData("夜班费上报表")!.list2 = {
        ...{
          allMoney: 0,
          ksfzr: '',
          ksfzrAutograph: '',
          ksfzrAutographDate: '',
          zgbmyj: '',
          zgbmyjAutograph: '',
          zgbmyjAutographDate: '',
        },
        ...data.list2
      }
      this.getSectionData("夜班费上报表")!.schNightTotalModel = data.schNightTotalModel
    } else {
      this.allData = data
      this.getSectionData("夜班费上报表")!.list = data
    }
  }

  async init(query?: any) {
    await this.initData(query);
    this.baseModal = createModal(BaseModal);
  }
}

export const starRatingReportEditModel = new StarRatingReportEditModel();
