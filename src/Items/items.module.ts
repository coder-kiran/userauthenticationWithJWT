import { Module } from "@nestjs/common";
import { ItemService } from "./items.services";


@Module({
 
  providers: [ItemService],
  exports:[ItemService]

})
export class ItemModule {}
