export function getMonkeyCodeNames(...config) {
	return (type) => {
		return config.map((item) => {
			const entries = item.languageOptions?.globals;
			if (!entries) {
				switch (type) {
					case "array": return [];
					case "record": return {};
				}
			}
			const customLibraries = [
				"GM_config",
				"GM_configStruct",
				"GM_configField",
				"GM_config"
			];
			switch (type) {
				case "array": return Object.keys(entries).concat(customLibraries);
				case "record": return Object.assign(entries, Object.fromEntries(customLibraries.map((key) => [key, "readonly"])));
			}
		});
	};
}
