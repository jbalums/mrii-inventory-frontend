import { Disclosure, Transition } from "@headlessui/react";

const Test = () => {
	return (
		<div className="h-screen w-full bg-slate-200 p-20">
			<Disclosure>
				<Disclosure.Button className="py-2">
					Is team pricing available?
				</Disclosure.Button>
				<Transition
					enter="transition duration-300 ease-out"
					enterFrom="transform opacity-0"
					enterTo="transform scale-300 opacity-100"
					leave="transition duration-200 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform opacity-0"
				>
					<Disclosure.Panel as="div" className={"bg-red-500"}>
						Yes! You can purchase a license that you can share with
						your entire team.
					</Disclosure.Panel>
				</Transition>
			</Disclosure>
		</div>
	);
};

export default Test;
