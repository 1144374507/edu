// import * as vueI18n from '@eweb_base/i18n/core'
import * as vuexStore from "@/vuex/store";
import * as vuexTypes from "@/vuex/types";
import * as vueRouter from "@/router/index";
// import vueRouterThree from "@eweb_base/router/three";
// import vueHttp from "@/http/index";

/*******扩展******/
let deftypes = {},
  storesExpend = [],
  routersExpend = [],
  routersExpendThree = [],
  i18nExpend = [];
Object.assign(deftypes, vuexTypes);
//通过用户配置的项目名扩展
var modulespath = document.getElementById("iotp-run-modules-path").value;
console.info("扩展的子项目；" + modulespath);
if (modulespath) {
  modulespath = modulespath.split(",");
  for (let i = 0; i < modulespath.length; i++) {
    try {
      let proName = modulespath[i];
      switch (proName) {
        case "eweb-common":
          const ewebCommonStore = require(`@eweb-common/vuex/store`).default;
          const ewebCommonRouter = require(`@eweb-common/router/index`).default;
          const ewebCommonRouterTree = require(`@eweb-common/router/three`).default;
          const ewebCommonI18n = require('@eweb-common/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebCommonStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebCommonRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebCommonRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebCommonI18n,
          })
          require(`@eweb-common/assets/css/main.scss`);
          break;
          // 参考
        case "eweb-setting-wan":
          const ewebSettingWanStore = require(`@eweb-setting-wan/vuex/store`).default;
          const ewebSettingWanRouter = require(`@eweb-setting-wan/router/index`).default;
          const ewebSettingWanRouterTree = require(`@eweb-setting-wan/router/three`).default;
          const ewebSettingWanI18n = require('@eweb-setting-wan/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingWanStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingWanRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingWanRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingWanI18n,
          })
          require(`@eweb-setting-wan/assets/css/main.scss`);
          break;
        case "eweb-setting-certification":
          const ewebSettingCertificationStore = require(`@eweb-setting-certification/vuex/store`).default;
          const ewebSettingCertificationRouter = require(`@eweb-setting-certification/router/index`).default;
          const ewebSettingCertificationRouterTree = require(`@eweb-setting-certification/router/three`).default;
          const ewebSettingCertificationI18n = require('@eweb-setting-certification/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingCertificationStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingCertificationRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingCertificationRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingCertificationI18n,
          })
          require(`@eweb-setting-certification/assets/css/main.scss`);
          break;
        case "eweb-ops-infrastructure":
          const ewebOpsInfrastructureStore = require(`@eweb-ops-infrastructure/vuex/store`).default;
          const ewebOpsInfrastructureRouter = require(`@eweb-ops-infrastructure/router/index`).default;
          const ewebOpsInfrastructureRouterTree = require(`@eweb-ops-infrastructure/router/three`).default;
          const ewebOpsInfrastructureI18n = require('@eweb-ops-infrastructure/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebOpsInfrastructureStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebOpsInfrastructureRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebOpsInfrastructureRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebOpsInfrastructureI18n,
          })
          require(`@eweb-ops-infrastructure/assets/css/main.scss`);
          break;
        case "eweb-ops-deviceRestart":
          const ewebOpsDeviceRestartStore = require(`@eweb-ops-deviceRestart/vuex/store`).default;
          const ewebOpsDeviceRestartRouter = require(`@eweb-ops-deviceRestart/router/index`).default;
          const ewebOpsDeviceRestartRouterTree = require(`@eweb-ops-deviceRestart/router/three`).default;
          const ewebOpsDeviceRestartI18n = require('@eweb-ops-deviceRestart/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebOpsDeviceRestartStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebOpsDeviceRestartRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebOpsDeviceRestartRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebOpsDeviceRestartI18n,
          })
          require(`@eweb-ops-deviceRestart/assets/css/main.scss`);
          break;
        case "eweb-ops-diagnosisTool":
          const ewebOpsDiagnosisToolStore = require(`@eweb-ops-diagnosisTool/vuex/store`).default;
          const ewebOpsDiagnosisToolRouter = require(`@eweb-ops-diagnosisTool/router/index`).default;
          const ewebOpsDiagnosisToolRouterTree = require(`@eweb-ops-diagnosisTool/router/three`).default;
          const ewebOpsDiagnosisToolI18n = require('@eweb-ops-diagnosisTool/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebOpsDiagnosisToolStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebOpsDiagnosisToolRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebOpsDiagnosisToolRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebOpsDiagnosisToolI18n,
          })
          require(`@eweb-ops-diagnosisTool/assets/css/main.scss`);
          break;
        case "eweb-ops-update":
          const ewebOpsUpdateStore = require(`@eweb-ops-update/vuex/store`).default;
          const ewebOpsUpdateRouter = require(`@eweb-ops-update/router/index`).default;
          const ewebOpsUpdateRouterTree = require(`@eweb-ops-update/router/three`).default;
          const ewebOpsUpdateI18n = require('@eweb-ops-update/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebOpsUpdateStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebOpsUpdateRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebOpsUpdateRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebOpsUpdateI18n,
          })
          require(`@eweb-ops-update/assets/css/main.scss`);
          break;
        case "eweb-setting-tool":
          const ewebSettingToolStore = require(`@eweb-setting-tool/vuex/store`).default;
          const ewebSettingToolRouter = require(`@eweb-setting-tool/router/index`).default;
          const ewebSettingToolRouterTree = require(`@eweb-setting-tool/router/three`).default;
          const ewebSettingToolI18n = require('@eweb-setting-tool/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingToolStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingToolRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingToolRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingToolI18n,
          })
          require(`@eweb-setting-tool/assets/css/main.scss`);
          break;
        case "eweb-setting-recovery":
          const ewebSettingRecoveryStore = require(`@eweb-setting-recovery/vuex/store`).default;
          const ewebSettingRecoveryRouter = require(`@eweb-setting-recovery/router/index`).default;
          const ewebSettingRecoveryRouterTree = require(`@eweb-setting-recovery/router/three`).default;
          const ewebSettingRecoveryI18n = require('@eweb-setting-recovery/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingRecoveryStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingRecoveryRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingRecoveryRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingRecoveryI18n,
          })
          require(`@eweb-setting-recovery/assets/css/main.scss`);
          break;
        case "eweb-setting-dhcp":
          const ewebSettingDhcpStore = require(`@eweb-setting-dhcp/vuex/store`).default;
          const ewebSettingDhcpRouter = require(`@eweb-setting-dhcp/router/index`).default;
          const ewebSettingDhcpRouterTree = require(`@eweb-setting-dhcp/router/three`).default;
          const ewebSettingDhcpI18n = require('@eweb-setting-dhcp/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingDhcpStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingDhcpRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingDhcpRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingDhcpI18n,
          })
          require(`@eweb-setting-dhcp/assets/css/main.scss`);
          break;
        case "eweb-system-administratoraccount":
          const ewebAdministratorAccountStore = require(`@eweb-system-administratoraccount/vuex/store`).default;
          const ewebAdministratorAccountRouter = require(`@eweb-system-administratoraccount/router/index`).default;
          const ewebAdministratorAccountRouterTree = require(`@eweb-system-administratoraccount/router/three`).default;
          const ewebAdministratorAccountI18n = require('@eweb-system-administratoraccount/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebAdministratorAccountStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebAdministratorAccountRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebAdministratorAccountRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebAdministratorAccountI18n,
          })
          require(`@eweb-system-administratoraccount/assets/css/main.scss`);
          break;
        case "eweb-system-basicsystemconfiguration":
          const ewebBasicSystemConfigurationStore = require(`@eweb-system-basicsystemconfiguration/vuex/store`).default;
          const ewebBasicSystemConfigurationRouter = require(`@eweb-system-basicsystemconfiguration/router/index`).default;
          const ewebBasicSystemConfigurationRouterTree = require(`@eweb-system-basicsystemconfiguration/router/three`).default;
          const ewebBasicSystemConfigurationI18n = require('@eweb-system-basicsystemconfiguration/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebBasicSystemConfigurationStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebBasicSystemConfigurationRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebBasicSystemConfigurationRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebBasicSystemConfigurationI18n,
          })
          require(`@eweb-system-basicsystemconfiguration/assets/css/main.scss`);
          break;
        case "eweb-system-operationallog":
          const ewebOperationalLogStore = require(`@eweb-system-operationallog/vuex/store`).default;
          const ewebOperationalLogRouter = require(`@eweb-system-operationallog/router/index`).default;
          const ewebOperationalLogRouterTree = require(`@eweb-system-operationallog/router/three`).default;
          const ewebOperationalLogI18n = require('@eweb-system-operationallog/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebOperationalLogStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebOperationalLogRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebOperationalLogRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebOperationalLogI18n,
          })
          require(`@eweb-system-operationallog/assets/css/main.scss`);
          break;
        case "eweb-system-webconsole":
            const ewebWebConsoleStore = require(`@eweb-system-webconsole/vuex/store`).default;
            const ewebWebConsoleRouter = require(`@eweb-system-webconsole/router/index`).default;
            const ewebWebConsoleRouterTree = require(`@eweb-system-webconsole/router/three`).default;
            const ewebWebConsoleI18n = require('@eweb-system-webconsole/i18n/index').default
            storesExpend.push({
              module: proName,
              store: ewebWebConsoleStore
            });
            routersExpend.push({
              prefix: proName,
              routers: ewebWebConsoleRouter
            });
            routersExpendThree.push({
              prefix: proName,
              routers: ewebWebConsoleRouterTree
            });
            i18nExpend.push({
              module: proName,
              message: ewebWebConsoleI18n,
            })
            require(`@eweb-system-webconsole/assets/css/main.scss`);
            break;
        case "eweb-setting-logupload":
          const ewebLogUploadStore = require(`@eweb-setting-logupload/vuex/store`).default;
          const ewebLogUploadRouter = require(`@eweb-setting-logupload/router/index`).default;
          const ewebLogUploadRouterTree = require(`@eweb-setting-logupload/router/three`).default;
          const ewebLogUploadI18n = require('@eweb-setting-logupload/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebLogUploadStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebLogUploadRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebLogUploadRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebLogUploadI18n,
          })
          require(`@eweb-setting-logupload/assets/css/main.scss`);
          break;
        case "eweb-monitor-interface":
          const ewebInterfaceStore = require(`@eweb-monitor-interface/vuex/store`).default;
          const ewebInterfaceRouter = require(`@eweb-monitor-interface/router/index`).default;
          const ewebInterfaceRouterTree = require(`@eweb-monitor-interface/router/three`).default;
          const ewebInterfaceI18n = require('@eweb-monitor-interface/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebInterfaceStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebInterfaceRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebInterfaceRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebInterfaceI18n,
          })
          require(`@eweb-monitor-interface/assets/css/main.scss`);
          break;
        case "eweb-monitor-antiring":
          const ewebAntiringStore = require(`@eweb-monitor-antiring/vuex/store`).default;
          const ewebAntiringRouter = require(`@eweb-monitor-antiring/router/index`).default;
          const ewebAntiringRouterTree = require(`@eweb-monitor-antiring/router/three`).default;
          const ewebAntiringI18n = require('@eweb-monitor-antiring/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebAntiringStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebAntiringRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebAntiringRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebAntiringI18n,
          })
          require(`@eweb-monitor-antiring/assets/css/main.scss`);
          break;
        case "eweb-ops-clickCollection":
          const ewebClickCollectionStore = require(`@eweb-ops-clickCollection/vuex/store`).default;
          const ewebClickCollectionRouter = require(`@eweb-ops-clickCollection/router/index`).default;
          const ewebClickCollectionRouterTree = require(`@eweb-ops-clickCollection/router/three`).default;
          const ewebClickCollectionI18n = require('@eweb-ops-clickCollection/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebClickCollectionStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebClickCollectionRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebClickCollectionRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebClickCollectionI18n,
          })
          require(`@eweb-ops-clickCollection/assets/css/main.scss`);
          break;
        case "eweb-ops-capPacket":
          const ewebCapPacketStore = require(`@eweb-ops-capPacket/vuex/store`).default;
          const ewebCapPacketRouter = require(`@eweb-ops-capPacket/router/index`).default;
          const ewebCapPacketRouterTree = require(`@eweb-ops-capPacket/router/three`).default;
          const ewebCapPacketI18n = require('@eweb-ops-capPacket/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebCapPacketStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebCapPacketRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebCapPacketRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebCapPacketI18n,
          })
          require(`@eweb-ops-capPacket/assets/css/main.scss`);
          break;
        case "eweb-setting-antiring":
          const ewebSettingAntiringStore = require(`@eweb-setting-antiring/vuex/store`).default;
          const ewebSettingAntiringRouter = require(`@eweb-setting-antiring/router/index`).default;
          const ewebSettingAntiringRouterTree = require(`@eweb-setting-antiring/router/three`)
            .default;
          const ewebSettingAntiringI18n = require('@eweb-setting-antiring/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingAntiringStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingAntiringRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingAntiringRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingAntiringI18n,
          })
          require(`@eweb-setting-antiring/assets/css/main.scss`);
          break;
        case "eweb-setting-anticheat":
          const ewebbSettingAntiCheatStore = require(`@eweb-setting-anticheat/vuex/store`).default;
          const ewebbSettingAntiCheatRouter = require(`@eweb-setting-anticheat/router/index`).default;
          const ewebbSettingAntiCheatRouterTree = require(`@eweb-setting-anticheat/router/three`).default;
          const ewebbSettingAntiCheatI18n = require('@eweb-setting-anticheat/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebbSettingAntiCheatStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebbSettingAntiCheatRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebbSettingAntiCheatRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebbSettingAntiCheatI18n,
          })
          require(`@eweb-setting-anticheat/assets/css/main.scss`);
          break;
        case "eweb-setting-antiattack":
          const ewebSettingAntiattackStore = require(`@eweb-setting-antiattack/vuex/store`).default;
          const ewebSettingAntiattackRouter = require(`@eweb-setting-antiattack/router/index`).default;
          const ewebSettingAntiattackRouterTree = require(`@eweb-setting-antiattack/router/three`).default;
          const ewebSettingAntiattackI18n = require('@eweb-setting-antiattack/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingAntiattackStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingAntiattackRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingAntiattackRouterTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingAntiattackI18n,
          })
          require(`@eweb-setting-antiattack/assets/css/main.scss`);
          break;
        case "eweb-setting-intfaccesscontrol":
          const ewebSettingIntfaccesscontrolStore = require(`@eweb-setting-intfaccesscontrol/vuex/store`).default;
          const ewebSettingIntfaccesscontrolRouter = require(`@eweb-setting-intfaccesscontrol/router/index`).default;
          const ewebSettingIntfaccesscontrolTree = require(`@eweb-setting-intfaccesscontrol/router/three`).default;
          const ewebSettingIntfaccesscontrolI18n = require('@eweb-setting-intfaccesscontrol/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingIntfaccesscontrolStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingIntfaccesscontrolRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingIntfaccesscontrolTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingIntfaccesscontrolI18n,
          })
          require(`@eweb-setting-intfaccesscontrol/assets/css/main.scss`);
          break;
        case "eweb-monitor-hardware":
          const ewebMonitorHardwareStore = require(`@eweb-monitor-hardware/vuex/store`).default;
          const ewebMonitorHardwareRouter = require(`@eweb-monitor-hardware/router/index`).default;
          const ewebMonitorHardwareTree = require(`@eweb-monitor-hardware/router/three`).default;
          const ewebMonitorHardwareI18n = require('@eweb-monitor-hardware/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebMonitorHardwareStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebMonitorHardwareRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebMonitorHardwareTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebMonitorHardwareI18n,
          })
          require(`@eweb-monitor-hardware/assets/css/main.scss`);
          break;
        case "eweb-setting-hardware":
          const ewebSettingHardwareStore = require(`@eweb-setting-hardware/vuex/store`).default;
          const ewebSettingHardwareRouter = require(`@eweb-setting-hardware/router/index`).default;
          const ewebSettingHardwareTree = require(`@eweb-setting-hardware/router/three`).default;
          const ewebSettingHardwareI18n = require('@eweb-setting-hardware/i18n/index').default
          storesExpend.push({
            module: proName,
            store: ewebSettingHardwareStore
          });
          routersExpend.push({
            prefix: proName,
            routers: ewebSettingHardwareRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: ewebSettingHardwareTree
          });
          i18nExpend.push({
            module: proName,
            message: ewebSettingHardwareI18n,
          })
          require(`@eweb-setting-hardware/assets/css/main.scss`);
          break;
        case "eweb-vlan":
          let inap_vlanStore = require(`@inap-vlan/vuex/store`).default;
          let inap_vlanTypes = require(`@inap-vlan/vuex/types`);
          let inap_vlanRouter = require(`@inap-vlan/router/index`)
            .default;
          let inap_vlanRouterTree = require(`@inap-vlan/router/three`)
            .default;
          storesExpend.push(inap_vlanStore);
          if (Object.getOwnPropertyNames(inap_vlanTypes).length > 0) {
            Object.assign(deftypes, inap_vlanTypes);
          }
          routersExpend.push({
            prefix: proName,
            routers: inap_vlanRouter
          });
          routersExpendThree.push({
            prefix: proName,
            routers: inap_vlanRouterTree
          });
          // require(`@inap-advertisement/assets/css/main.scss`);
          break;
        }
    } catch (e) {
      console.log("通过用户配置的项目名扩展异常？{}", e);
    }
  }
}
/*******扩展******/
//配置store、router、axios
export const store = vuexStore.store(deftypes, storesExpend);
export const router = vueRouter.router(
  store,
  deftypes,
  routersExpend,
  routersExpendThree
);
// export const i18n = vueI18n.i18n(
//   i18nExpend,
//   store
// )
// export const axios = vueHttp(store, deftypes, router);
export const types = deftypes;
