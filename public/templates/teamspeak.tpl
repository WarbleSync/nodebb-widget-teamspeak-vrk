<link rel="stylesheet" type="text/css" href="/plugins/nodebb-widget-teamspeak-vrk/public/css/style.css">
<div class="ts3-vrk-widget">
  <h3 class="ts3-title" >
    {name}
    <span class="small">
      ({address})
    </span>
  </h3>

  <a class="btn btn-primary ts3-join-button" role="button" href="ts3server://{address}">
    <div class="">join server</div>
  </a>

  <div class="ts3-online-clients" >
    <div>
      <span class="badge">
        {users-online}
      </span> Users Online:
    </div>

    <div class="ts3-online-users" >
      <ul class="list-group text-right">
        <!-- BEGIN user-list -->
          <li> {user-list.name} </li>
        <!-- END user-list -->
      </ul>
    </div>
  </div>
</div>
