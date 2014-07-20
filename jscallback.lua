-- Lua --> JS callback
--
js.callback = function(funcName, args)
  if not args then
  	args = []
  end
  js.run(funcName..'('..table.concat(args, ',')..')')
end

 

 