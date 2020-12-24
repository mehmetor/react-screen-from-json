import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DataGrid, {
	Column,
	RowDragging,
	Scrolling,
	Lookup,
	Sorting,
	Editing,
	FilterRow
} from "devextreme-react/data-grid";
import { types } from "../data.js";
import {
	reorderColumns,
	columnRemoving,
	columnUptading
} from "../config/screenSlice";

const ColumnEditor = () => {
	let dispatch = useDispatch();
	const { Lists } = useSelector((s) => s.slice.config);
	const Screen = useSelector((s) => s.slice.screen);

	function onColumnsReorder(e) {
		const visibleRows = e.component.getVisibleRows();
		const to = visibleRows[e.toIndex].data;
		const itemData = e.itemData;
		let newColumns = [...Screen.columns]
		dispatch(reorderColumns({ to, itemData, newColumns }));
	}

	function onColumnsRowRemoving(e) {
		let key = e.data.name;
		dispatch(columnRemoving({ key }));
		e.cancel = true
		return;
	}

	function onColumnsRowUpdating(e) {
		console.log("columnUptading", e);
		const newData = e.newData;
		const key = e.key;
		dispatch(columnUptading({ key, newData }));
		e.cancel = true
		return;
	}

	function onColumnsSaved() {
		//dispatch(updateScreen({ screen: Screen, name: props.name }));
	}

	if (!Screen)
		return "Select screen"


	return (
		<DataGrid
			//height={400}
			//width={"100%"}
			dataSource={Screen.columns}
			showBorders={true}
			keyExpr={"name"}
			onRowUpdating={onColumnsRowUpdating}
			onRowRemoving={onColumnsRowRemoving}
			onSaved={onColumnsSaved}
			hoverStateEnabled={true}
			allowColumnResizing={true}
			allowColumnReordering={true}
			//columnHidingEnabled={true}
			rowAlternationEnabled={true}
			columnResizingMode="widget"
			columnMinWidth={40}
		>
			<FilterRow visible={true} />

			<Editing
				mode="row"
				allowUpdating={true}
				allowDeleting={true}
				allowAdding={false}
				useIcons={true}
			/>

			<RowDragging allowReordering={true} onReorder={onColumnsReorder} />
			<Scrolling mode="virtual" />
			<Sorting mode="none" />

			<Column dataField="index" width={80} allowEditing={false} />
			<Column dataField="hidden" width={80} dataType="boolean" />
			<Column dataField="name" width={250} allowEditing={false} />

			<Column dataField="type" width={100}>
				<Lookup dataSource={types} valueExpr="name" displayExpr="name" />
			</Column>
			<Column dataField="format">
				<Lookup
					dataSource={Lists.DateFormats}
					valueExpr="localized"
					displayExpr={(item) => {
						return item.localized + " '" + item.format.tr + "' " + item.caption;
					}}
				/>
			</Column>
			<Column dataField="width" width={80} />
			<Column dataField="autoComplete">
				<Lookup dataSource={Object.keys(Lists)} />
			</Column>
		</DataGrid>
	);
};

export default ColumnEditor;
