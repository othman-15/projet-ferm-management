"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesureModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const mesure_controller_1 = require("./mesure.controller");
const mesure_service_1 = require("./mesure.service");
const mesure_entity_1 = require("./entities/mesure.entity");
const equipment_client_1 = require("../clients/equipment.client");
const projet_client_1 = require("../clients/projet.client");
let MesureModule = class MesureModule {
};
exports.MesureModule = MesureModule;
exports.MesureModule = MesureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mesure_entity_1.Mesure.name, schema: mesure_entity_1.MesureSchema },
            ]),
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
        ],
        controllers: [mesure_controller_1.MesureController],
        providers: [
            mesure_service_1.MesureService,
            equipment_client_1.EquipmentClient,
            projet_client_1.ProjetClient,
        ],
        exports: [mesure_service_1.MesureService],
    })
], MesureModule);
//# sourceMappingURL=mesure.module.js.map