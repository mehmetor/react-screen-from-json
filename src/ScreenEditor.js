import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectBox, TabPanel, Tabs, Button } from "devextreme-react";
import Form, { GroupItem, SimpleItem, Item, ButtonItem } from "devextreme-react/form";
import { updateConfigScreen, setScreen, updateScreen } from "./config/screenSlice";
import { ColumnEditor, SubModelConfig, Result } from "./components";

const ScreenEditor = () => {
	let dispatch = useDispatch();
	const { Names, Screens } = useSelector((s) => s.slice.config);
	const { screen: Screen, name: Name } = useSelector((s) => { return s.slice });

	//const [Screen, setScreen] = React.useState({});
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const formFieldDataChanged = (args) => {
		console.log("formFieldDataChanged", args)
		dispatch(updateScreen({ dataField: args.dataField, value: args.value }));
	}

	const onUpdateConfigScreen = () => {
		dispatch(updateConfigScreen())
	}

	const onScreenChanged = React.useCallback(
		(args) => {
			const sc = Screens[args.value];
			if (sc) {
				dispatch(setScreen({ screen: sc, name: args.value }));
			}
		},
		[Screens, dispatch]
	);

	React.useEffect(() => {
		const sc = Screens[Name];
		if (sc) dispatch(setScreen({ screen: sc, name: Name }));
	}, [Screens, dispatch]);

	return (
		<React.Fragment>
			<div className="options">

				<Form>
					<GroupItem colCount={2}>
						<Item>
							<SelectBox
								dataSource={Names}
								value={Name}
								onValueChanged={onScreenChanged}
							/>
						</Item>
						<GroupItem colCount={2}>
							<Item itemType="button" buttonOptions={{
								width: 120,
								text: "Reset",
								//type: "default",
								stylingMode: "contained",
								onClick: onUpdateConfigScreen
							}} />
							<Item itemType="button" buttonOptions={{
								width: 120,
								text: "Save",
								type: "default",
								stylingMode: "contained",
								onClick: onUpdateConfigScreen
							}} />
						</GroupItem>
					</GroupItem>
				</Form>
				<br />
				<Form
					formData={{ ...Screen }}
					onFieldDataChanged={formFieldDataChanged}
				>
					<GroupItem colCount={2}>
						<GroupItem colCount={2} caption="General Settings">
							<SimpleItem dataField="title" />
							<SimpleItem dataField="hideInSidebar" />
							<SimpleItem dataField="keyFieldName" />
							<SimpleItem dataField="isDefinitionModel" />
							<SimpleItem dataField="route" />
						</GroupItem>

						<GroupItem>
							<Form
								formData={{ ...Screen.editing }}
								onFieldDataChanged={(args) => {
									let value = {};
									value[args.dataField] = args.value;
									formFieldDataChanged({
										dataField: "editing",
										value: { ...Screen.editing, ...value }
									})
								}}
							>
								<GroupItem colCount={2} caption="Editing">
									<Item dataField="enabled" editorType="dxCheckBox" />
									{Screen.editing && Screen.editing.enabled == true &&
										<GroupItem>
											<Item dataField="allowUpdate" editorType="dxCheckBox" />
											<Item dataField="allowEdit" editorType="dxCheckBox" />
											<Item dataField="allowRemove" editorType="dxCheckBox" />
										</GroupItem>
									}
								</GroupItem>
							</Form>
						</GroupItem>
					</GroupItem>

				</Form>
				<br />


			</div>
			<Tabs
				//height={260}
				dataSource={["Columns", "Sub Models", "Result"]}
				selectedIndex={selectedIndex}
				onOptionChanged={(args) => {
					if (args.name === "selectedIndex") {
						console.log("onOptionChanged", args.name, args.value);
						setSelectedIndex(args.value);
					}
				}}
			//loop={loop}
			//itemTitleRender={this.itemTitleRender}
			// itemComponent={(x) => {
			//   if (x.index === 0) return;
			//   // if (x.index === 2) return <Result />;
			//   //else
			//   return <span>undefined</span>;
			// }}
			//animationEnabled={false}
			//swipeEnabled={false}
			/>

			{ Screen && selectedIndex === 0 && <ColumnEditor name={Name} />}
			{ Screen && selectedIndex === 1 && <SubModelConfig name={Name} />}
			{ Screen && selectedIndex === 2 && <Result />}

		</React.Fragment >
	);
};

export default ScreenEditor;
