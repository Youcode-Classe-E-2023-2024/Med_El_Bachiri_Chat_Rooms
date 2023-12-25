<!-- component -->
<div class="flex h-full antialiased text-gray-800">
    <div class="flex flex-row w-full overflow-x-hidden">


        <div class="flex flex-col py-8 p-4 w-64 border bg-white">
            <div class="flex flex-row items-center justify-center w-full">
                <div class="font-bold text-2xl">Rooms</div>
            </div>
            <div class="flex flex-col mt-8">
                <div class="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto" style="height: 485px;">
                    <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            <p>H</p>
                        </div>
                        <div class="ml-2 text-sm font-semibold">Henry Boyd</div>
                    </button>
                </div>
            </div>
            <div class="flex w-full justify-center">
                <p id="creat_room_btn" class="bg-green-600 text-white p-1 w-36 flex items-center justify-center border cursor-pointer hover:opacity-90 border-green-900 rounded-lg shadow-xl ">Create Room</p>
            </div>

            <div id="creat_room_form" style="display: none;" class="bg-gray-900 p-8 rounded shadow-md w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="flex justify-end mb-2">
                    <p id="close_form" class="w-fit bg-white rounded-sm cursor-pointer shadow-xl py-2 px-3 hover:opacity-80">X</p>
                </div>
                    <!-- Group Name -->
                    <div class="mb-4">
                        <label for="room_name" class="block text-sm font-medium text-gray-600">Group Name</label>
                        <input required type="text" id="room_name" name="group-name" class="mt-1 p-2 w-full border rounded-md">
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button id="button_room" type="submit" class="bg-blue-900 text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring focus:border-blue-300">
                            Create Group
                        </button>
                    </div>
            </div>
        </div>


        <div class="flex flex-col flex-auto p-6" style="height: 660px;">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-200 h-full p-4">
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                    <div class="flex flex-col h-full">
                        <div class="grid grid-cols-12 gap-y-2">
                            <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                <div class="flex flex-row items-center">
                                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                        A
                                    </div>
                                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                        <div>Hey How are you today?</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                <div class="flex items-center justify-start flex-row-reverse">
                                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                        P
                                    </div>
                                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                        <div>I'm ok what about you?</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div class="flex-grow">
                        <div class="relative w-full">
                            <input type="text" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"/>
                        </div>
                    </div>
                    <div class="ml-4">
                        <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                            <span class="ml-2">
                              <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                              </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div class="flex flex-col py-8 p-4 w-64 border bg-white">
            <div class="flex flex-col mt-8">
                <div class="flex flex-row items-center justify-between text-xs">
                    <span class="font-bold">Group Members</span>
                </div>
                <div class="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto" style="height: 485px;">
                    <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            <p>H</p>
                        </div>
                        <div class="ml-2 text-sm font-semibold">Henry Boyd</div>
                    </button>
                </div>
            </div>
        </div>


    </div>
</div>