import React from 'react'
import {FlyoutMenu, Button, MenuItem} from "@dhis2/ui";
import {IconDelete24, IconArrowDown24, IconArrowUp24} from "@dhis2/ui-icons";

const MoreOptions = () => {
  return (
    <FlyoutMenu>
        
        <MenuItem label="Move up" icon={<IconArrowUp24/>}/>
        <MenuItem label="Move down" icon={<IconArrowDown24/>}/>
        <MenuItem label="Delete chart" icon={<IconDelete24/>}/>
    </FlyoutMenu>
        )
}

export default MoreOptions